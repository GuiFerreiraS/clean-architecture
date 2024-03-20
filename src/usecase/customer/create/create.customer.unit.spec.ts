import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zipcode",
    city: "City",
  },
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name must be at least 3 characters long"
    );
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
