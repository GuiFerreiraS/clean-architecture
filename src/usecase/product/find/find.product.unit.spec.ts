import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";

const productA = ProductFactory.create("a", "Product A", 100);
const productB = ProductFactory.create("b", "Product B", 200);

const MockRepository = (): ProductRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productA)),
    findAll: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product a and b", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: productA.id,
    };

    const outputA = {
      id: productA.id,
      name: productA.name,
      price: productA.price,
    };

    const outputB = {
      id: productB.id,
      name: productB.name,
      price: productB.price,
    };

    const resultA = await useCase.execute(input);
    expect(resultA).toStrictEqual(outputA);

    (productRepository.find as jest.Mock).mockReturnValue(
      Promise.resolve(productB)
    );

    const resultB = await useCase.execute(input);
    expect(resultB).toStrictEqual(outputB);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    (productRepository.find as jest.Mock).mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: productA.id,
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
