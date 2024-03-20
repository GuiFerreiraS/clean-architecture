import Product from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unity tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    const product3 = new Product("3", "Product 3", 300);
    const product4 = new Product("4", "Product 4", 400);

    const products = [product1, product2, product3, product4];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
    expect(product3.price).toBe(600);
    expect(product4.price).toBe(800);
  });
});
