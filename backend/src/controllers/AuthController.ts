import { NextFunction, Request, Response } from "express";
import { giftLovTimeStampFormat } from "../utils/giftLovTimeStampFormat";
import { generateSignature } from "../utils/generateSignature";
import {
  ContentType,
  HTTP_STATUS,
  RequestHeader,
  RequestMethod,
} from "../constants/common";
import HttpClient from "../lib/HttpClient";
import config from "../config";
import { GiftLovAPI } from "../constants/giftlov";

class AuthController {
  constructor() {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res
          .status(HTTP_STATUS.UNAUTHENTICATED)
          .json({ error: "Missing username or password" });
        return;
      }

      const data = await HttpClient.post({
        url: GiftLovAPI.GENERATE_TOKEN,
        data: { username, password },
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: await giftLovTimeStampFormat(
            config.app.currentTimezone
          ),
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
        },
      });

      res.status(HTTP_STATUS.OK).json({ ...data });
    } catch (err) {
      console.log(`Error in ${AuthController.name}::${this.login.name}`, err);

      if (err.response) {
        console.error("Error in Axios response", err.response.data);
        res.status(HTTP_STATUS.UNAUTHENTICATED).json(err.response.data);

        return;
      }

      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err.response.data);
    }
  }

  public async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "token is missing!" });
        return;
      }

      const [timestamp, signature] = await generateSignature({
        currentUrl: GiftLovAPI.CHECK_TOKEN,
        authToken: token,
        requestMethod: RequestMethod.POST,
      });

      const data = await HttpClient.post({
        url: GiftLovAPI.CHECK_TOKEN,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({ message: "Token verified", ...data });
    } catch (err) {
      console.log(
        `Error in ${AuthController.name}::${this.verifyToken.name}`,
        err
      );

      if (err.response) {
        console.error("Error in Axios response", err.response.data);
        res.status(HTTP_STATUS.UNAUTHENTICATED).json(err.response.data);

        return;
      }

      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err.response.data);
    }
  }
}

export default new AuthController();
