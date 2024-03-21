import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 100);

const input = {
  id: product.id,
  name: "Product A",
  price: 100,
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn(),
});

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw an error when missing name", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      productUpdateUseCase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      productUpdateUseCase.execute({ ...input, price: -10 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
