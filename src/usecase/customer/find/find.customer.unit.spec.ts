import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.changeAddress(address);

const MockRepository = (): CustomerRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("Unit test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    (customerRepository.find as jest.Mock).mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
