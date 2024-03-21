import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product A", 100);

const input = {
  id: product.id,
  name: "Product A",
  price: 100,
};

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw an error when missing name", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      productUpdateUseCase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      productUpdateUseCase.execute({ ...input, price: -10 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
