import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
  id: "123",
  name: "Product A",
  price: 100,
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest
    .fn()
    .mockReturnValue(Promise.resolve(new Product("123", "Product A", 100))),
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
    ).rejects.toThrow("product: Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    await expect(
      productUpdateUseCase.execute({ ...input, price: -10 })
    ).rejects.toThrow("product: Price must be greater than zero");
  });
});
