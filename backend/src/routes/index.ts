import { Router } from "express";
import controller from "../controllers/Controller";

const router = Router();

router.post("/login", async (req, res, next) => {
  await controller.login(req, res, next);
});
//

export default router;
