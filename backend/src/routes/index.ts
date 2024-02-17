import { Router } from "express";
import { requestLogger } from "../middlewares/requestLogger";

import authRouter from "./Auth";
import catalogueRouter from "./Catalogue";
import orderRouter from "./Order";

const router = Router();

router.use("/auth", requestLogger, authRouter);
router.use("/catalogue", requestLogger, catalogueRouter);
router.use("/order", requestLogger, orderRouter);

export default router;
