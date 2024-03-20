import Order from "./order";
import OrderItem from "./order_item";

describe("Order unity tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "1", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when item quantity is 0", () => {
    expect(() => {
      let order = new Order("123", "1", []);
    }).toThrow("Item quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 110, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 210, "p2", 2);

    const order = new Order("123", "1", [item1, item2]);

    expect(order.total()).toEqual(640);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 110, "p1", 0);
      const order = new Order("123", "1", [item1]);
    }).toThrow("Quantity must be greater than 0");
  });
});
