import { NextFunction, Request, Response } from "express";
import { generateSignature } from "../utils/generateSignature";
const querystring = require("querystring");
import {
  ContentType,
  HTTP_STATUS,
  RequestHeader,
  RequestMethod,
} from "../constants/common";
import HttpClient from "../lib/HttpClient";
import { GiftLovAPI } from "../constants/giftlov";

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
        currentUrl: GiftLovAPI.CATALOGUE_ITEMS,
        authToken: token as string,
        requestMethod: RequestMethod.GET,
        queryParams,
      });

      const data = await HttpClient.get({
        url: `${GiftLovAPI.CATALOGUE_ITEMS}?${querystring.stringify(
          queryParams
        )} `,
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
        `Error in ${CatalogueController.name}::${this.items.name}`,
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

export default new CatalogueController();
