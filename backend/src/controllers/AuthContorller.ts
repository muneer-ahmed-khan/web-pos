import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { giftLovTimeStampFormat } from "../utils/giftLovTimeStampFormat";
import { HTTP_STATUS, RequestHeader } from "../constants/common";
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

      const response = await HttpClient.post(
        config.giftLovUrls.Auth.generateToken,
        { username, password },
        {
          headers: {
            [RequestHeader.GIFT_LOV_DATE]: giftLovTimeStampFormat(
              config.app.currentTimezone
            ),
            [RequestHeader.ACCEPT]: "application/json",
            [RequestHeader.CONTENT_TYPE]: "application/json",
          },
        }
      );

      res.status(HTTP_STATUS.OK).json(response.data);
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
