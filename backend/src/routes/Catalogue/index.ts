import { Router } from "express";
import CatalogueController from "../../controllers/CatalogueController";

const catalogueRouter = Router();

catalogueRouter.get("/items", async (req, res, next) => {
  await CatalogueController.items(req, res, next);
});

export default catalogueRouter;
