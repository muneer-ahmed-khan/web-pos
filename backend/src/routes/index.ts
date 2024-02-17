import { Router } from "express";
import AuthController from "../controllers/AuthContorller";
import { generateSignature } from "../utils/generateSignature";

const router = Router();

router.post("/login", async (req, res, next) => {
  await AuthController.login(req, res, next);
});

export default router;
