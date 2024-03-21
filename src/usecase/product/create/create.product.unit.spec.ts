import CreateProductUseCase from "./create.product.usecase";

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

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test create product use case", () => {
  it("should create a product with type a and b", async () => {
    const productRepository = MockRepository();
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
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...inputA, name: "" })
    ).rejects.toThrow("product: Name is required");

    await expect(
      productCreateUseCase.execute({ ...inputB, name: "" })
    ).rejects.toThrow("product: Name is required");
  });

  it("should throw an error when price is negative for type a and b", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(
      productCreateUseCase.execute({ ...inputA, price: -1 })
    ).rejects.toThrow("product: Price must be greater than zero");

    await expect(
      productCreateUseCase.execute({ ...inputB, price: -1 })
    ).rejects.toThrow("product: Price must be greater than zero");
  });
});
