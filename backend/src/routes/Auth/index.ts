import { Router } from "express";
import AuthController from "../../controllers/AuthController";

const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  await AuthController.login(req, res, next);
});

authRouter.post("/verify-token", async (req, res, next) => {
  await AuthController.verifyToken(req, res, next);
});

export default authRouter;
