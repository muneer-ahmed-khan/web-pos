import { Router } from "express";
import authRouter from "./Auth";
import { requestLogger } from "../middlewares/requestLogger";

const router = Router();

router.use("", requestLogger, authRouter);

export default router;
