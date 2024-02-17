import { Router } from "express";
import { requestLogger } from "../middlewares/requestLogger";

import authRouter from "./Auth";
import catalogueRouter from "./Catalogue";

const router = Router();

router.use("/auth", requestLogger, authRouter);
router.use("/catalogue", requestLogger, catalogueRouter);

export default router;
