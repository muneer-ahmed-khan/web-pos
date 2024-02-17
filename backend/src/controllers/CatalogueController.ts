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

class CatalogueController {
  constructor() {}

  public async items(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization: token } = req.headers;

      const { current = 1, lang = "EN", rowCount = 100 } = req.query;
      const queryParams = {
        current,
        lang,
        rowCount,
      };

      if (!token) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ error: "token is missing!" });
        return;
      }

      const [timestamp, signature] = await generateSignature({
        currentUrl: config.giftLovUrls.Catalogue.items,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
        queryParams,
      });

      const data = await HttpClient.get({
        url: `${config.giftLovUrls.Catalogue.items}?${querystring.stringify(
          queryParams
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
}

export default new CatalogueController();
