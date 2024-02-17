import { Router } from "express";
import OrderController from "../../controllers/OrderController";

const orderRouter = Router();

orderRouter.get("/orders", async (req, res, next) => {
  await OrderController.getOrders(req, res, next);
});

orderRouter.get("/orders/:identifier", async (req, res, next) => {
  await OrderController.getOrderStatus(req, res, next);
});

orderRouter.post("/place-order", async (req, res, next) => {
  await OrderController.placeOrder(req, res, next);
});

export default orderRouter;
