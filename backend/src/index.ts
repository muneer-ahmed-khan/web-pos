import { config as configEnv } from "dotenv";
import * as path from "path";
configEnv({ path: path.resolve(__dirname, "../.env") });

import App from "./core/App";

(async () => await App.init())();
