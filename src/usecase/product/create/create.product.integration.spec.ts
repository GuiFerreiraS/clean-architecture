import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";

const inputA = {
  type: "a",
  name: "Product A",
  price: 100,
};

const inputB = {
  type: "b",
  name: "Product B",
  price: 200,
};

describe("Factory test create product use case", () => {
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

  it("should create a product with type a and b", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const outputA = await productCreateUseCase.execute(inputA);
    const outputB = await productCreateUseCase.execute(inputB);

    expect(outputA).toEqual({
      id: expect.any(String),
      type: inputA.type,
      name: inputA.name,
      price: inputA.price,
    });

    expect(outputB).toEqual({
      id: expect.any(String),
      type: inputB.type,
      name: inputB.name,
      price: inputB.price * 2,
    });
  });

  it("should throw an error when name is missing for type a and b", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...inputA, name: "" })
    ).rejects.toThrow("Name is required");

    await expect(
      productCreateUseCase.execute({ ...inputB, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative for type a and b", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...inputA, price: -1 })
    ).rejects.toThrow("Price must be greater than zero");

    await expect(
      productCreateUseCase.execute({ ...inputB, price: -1 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
