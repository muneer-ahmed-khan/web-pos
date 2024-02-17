import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/common";
import config from "../config";
import Axios from "axios";

class Controller {
  //General controller code that needs to be available in all
  //controllers.
  constructor() {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      console.log(req.body, config.giftlov.login);
      if (!username || !password) {
        return res
          .status(HTTP_STATUS.UNAUTHENTICATED)
          .json({ Error: "missing username or password" });
      }

      const response = await Axios.post(
        `${config.giftlov.login}`,
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(HTTP_STATUS.OK).json(response.data);
    } catch (err) {
      console.log("Error in axios response", err.response.data);
      res.status(HTTP_STATUS.UNAUTHENTICATED).json(err.response.data);
    }
  }
}

export default new Controller();
