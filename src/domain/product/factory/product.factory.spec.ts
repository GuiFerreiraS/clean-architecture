import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const productB = ProductFactory.create("a", "Product A", 1);

    expect(productB.id).toBeDefined();
    expect(productB.name).toBe("Product A");
    expect(productB.price).toBe(1);
    expect(productB.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error if the product type is not supported", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 1);
    }).toThrow("Product type not supported");
  });
});
