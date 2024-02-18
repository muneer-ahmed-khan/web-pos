import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { generateSignature } from "../utils/generateSignature";
import {
  ContentType,
  HTTP_STATUS,
  RequestHeader,
  RequestMethod,
} from "../constants/common";
import HttpClient from "../lib/HttpClient";
import querystring from "querystring";
import { GiftLovAPI } from "../constants/giftlov";

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
        currentUrl: GiftLovAPI.GET_ORDERS,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
        queryParams: req.query,
      });

      const data = await HttpClient.get({
        url: `${GiftLovAPI.GET_ORDERS}`,
        data: req.query,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
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

  public async getOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization: token } = req.headers;
      const { identifier } = req.params;

      if (!token) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "token is missing!" });
        return;
      }

      const [timestamp, signature] = await generateSignature({
        currentUrl: `${GiftLovAPI.GET_ORDERS}/${identifier}`,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
      });

      const data = await HttpClient.get({
        url: `${GiftLovAPI.GET_ORDERS}/${identifier}`,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
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

  public async generateSingleUseUrl(
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
        currentUrl: GiftLovAPI.GENERATE_SINGLE_USE_URL,
        authToken: token as string,
        requestMethod: RequestMethod.POST,
        body: req.body,
      });

      const data = await HttpClient.post({
        url: GiftLovAPI.GENERATE_SINGLE_USE_URL,
        data: req.body,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({
        ...data,
      });
    } catch (err) {
      console.log(
        `Error in ${OrderController.name}::${this.generateSingleUseUrl.name}`,
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

  public async priceAndValidateOrder(
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
        currentUrl: GiftLovAPI.PRICE_AND_VALIDATE_ORDER,
        authToken: token as string,
        requestMethod: RequestMethod.POST,
        body: req.body,
      });

      const data = await HttpClient.post({
        url: GiftLovAPI.PRICE_AND_VALIDATE_ORDER,
        data: req.body,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({
        ...data,
      });
    } catch (err) {
      console.log(
        `Error in ${OrderController.name}::${this.priceAndValidateOrder.name}`,
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
        currentUrl: GiftLovAPI.PLACE_ORDER,
        authToken: token as string,
        requestMethod: RequestMethod.POST,
        body: req.body,
      });

      const data = await HttpClient.post({
        url: GiftLovAPI.PLACE_ORDER,
        data: req.body,
        headers: {
          [RequestHeader.GIFT_LOV_DATE]: timestamp,
          [RequestHeader.ACCEPT]: ContentType.JSON,
          [RequestHeader.CONTENT_TYPE]: ContentType.JSON,
          [RequestHeader.SIGNATURE]: signature,
          [RequestHeader.AUTHORIZATION]: token,
        },
      });

      res.status(HTTP_STATUS.OK).json({
        ...data,
      });
    } catch (err) {
      console.log(
        `Error in ${OrderController.name}::${this.placeOrder.name}`,
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

export default new OrderController();
