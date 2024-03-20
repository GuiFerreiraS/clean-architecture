import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John updated",
  address: {
    street: "Street updated",
    number: 1234,
    zip: "Zip updated",
    city: "City updated",
  },
};

const MockRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  update: jest.fn(),
});

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(input);
  });

  it("should throw an error when street is missing in update", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
