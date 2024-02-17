import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { giftLovTimeStampFormat } from "../utils/giftLovTimeStampFormat";
import { generateSignature } from "../utils/generateSignature";
import {
  ApiContentType,
  HTTP_STATUS,
  RequestHeader,
  RequestMethod,
} from "../constants/common";
import HttpClient from "../lib/HttpClient";
import config from "../config";

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
        url: config.giftLovUrls.Auth.generateToken,
        data: { username, password },
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: await giftLovTimeStampFormat(
            config.app.currentTimezone
          ),
          [RequestHeader.ACCEPT]: ApiContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ApiContentType.JSON,
        },
      });

      res.status(HTTP_STATUS.OK).json({ ...data });
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        console.error("Error in Axios response", axiosError.response.data);
        res.status(HTTP_STATUS.UNAUTHENTICATED).json(axiosError.response.data);
      } else {
        console.error("Error in Axios request", axiosError.message);
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }
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
        currentUrl: config.giftLovUrls.Auth.checkToken,
        authToken: token,
        requestMethod: RequestMethod.POST,
      });

      const data = await HttpClient.post({
        url: config.giftLovUrls.Auth.checkToken,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ApiContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ApiContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({ message: "Token verified", ...data });
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response) {
        console.error("Error in Axios response", axiosError.response.data);
        res.status(HTTP_STATUS.UNAUTHENTICATED).json(axiosError.response.data);
      } else {
        console.error("Error in Axios request", axiosError.message);
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal server error" });
      }
    }
  }
}

export default new AuthController();
