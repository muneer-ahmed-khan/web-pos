import { Router } from "express";
import OrderController from "../../controllers/OrderController";

const orderRouter = Router();

orderRouter.post("/place-order", async (req, res, next) => {
  await OrderController.placeOrder(req, res, next);
});

export default orderRouter;
