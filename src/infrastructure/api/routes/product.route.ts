import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      type: req.body.type ?? "a",
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  try {
    const productDto = {};

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
