import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { generateSignature } from "../utils/generateSignature";
const querystring = require("querystring");
import {
  ApiContentType,
  HTTP_STATUS,
  RequestHeader,
  RequestMethod,
} from "../constants/common";
import HttpClient from "../lib/HttpClient";
import config from "../config";

class OrderController {
  constructor() {}

  public async getOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization: token } = req.headers;

      if (!token) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "token is missing!" });
        return;
      }

      const [timestamp, signature] = await generateSignature({
        currentUrl: config.giftLovUrls.Order.getOrders,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
        queryParams: req.query,
      });

      const data = await HttpClient.get({
        url: `${config.giftLovUrls.Order.getOrders}?${querystring.stringify(
          req.query
        )} `,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ApiContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ApiContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({
        ...data,
      });
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

  public async placeOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization: token } = req.headers;

      if (!token) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "token is missing!" });
        return;
      }

      const [timestamp, signature] = await generateSignature({
        currentUrl: config.giftLovUrls.Order.placeOrder,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
        body: req.body,
      });

      const data = await HttpClient.post({
        url: config.giftLovUrls.Order.placeOrder,
        data: req.body,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ApiContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ApiContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({
        ...data,
      });
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

export default new OrderController();
