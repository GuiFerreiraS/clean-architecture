import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product A", 100);

describe("Integration test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 100,
    };

    const result = await useCase.execute(input);
    expect(result).toStrictEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    await expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
