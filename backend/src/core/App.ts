import { Express, NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import config from "../config";
import router from "../routes";

class App {
  public app: Express;

  constructor() {
    this.app = express();
  }

  public async init() {
    this.app.use(bodyParser.json({ limit: "20mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
    this.app.use(cors());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      //Before middleware
      next();
    });

    this.app.use(router);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      //After middleware
      next();
    });

    const port = config.app.port;

    this.app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  }
}

export default new App();
