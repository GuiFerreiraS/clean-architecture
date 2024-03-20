import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "../event/handler/send-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/send-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/send-console-log.handler";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unity tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Guilherme");
    }).toThrow("Id cannot be empty");
  });

  it("should throw error when name have name smaller than 3", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrow("Name must be at least 3 characters long");
  });

  it("should change name", () => {
    let customer = new Customer("1", "Guilherme");
    customer.changeName("James");
    expect(customer.name).toEqual("James");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "387468-000", "New York");
    customer.address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when activating customer without address", () => {
    const customer = new Customer("1", "Customer 1");

    expect(() => {
      customer.activate();
    }).toThrow("Address cannot be empty");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(5);
    expect(customer.rewardPoints).toBe(5);

    customer.addRewardPoints(5);
    expect(customer.rewardPoints).toBe(10);
  });

  it("should notify all event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handle = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handle = new EnviaConsoleLog2Handler();
    const spyEnviaConsoleLog1Handle = jest.spyOn(
      enviaConsoleLog1Handle,
      "handle"
    );
    const spyEnviaConsoleLog2Handle = jest.spyOn(
      enviaConsoleLog2Handle,
      "handle"
    );

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handle);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handle);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(enviaConsoleLog1Handle);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(enviaConsoleLog2Handle);

    new Customer("1", "Customer 1", eventDispatcher);

    expect(spyEnviaConsoleLog1Handle).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handle).toHaveBeenCalled();
  });

  it("should notify all event handlers when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandle = new EnviaConsoleLogHandler();
    const spyEnviaConsoleLogHandle = jest.spyOn(
      enviaConsoleLogHandle,
      "handle"
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandle
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandle);

    const customer = new Customer("1", "Customer 1", eventDispatcher);
    const address = new Address("Street 1", 10, "387468-000", "New York");

    customer.changeAddress(address);

    expect(spyEnviaConsoleLogHandle).toHaveBeenCalled();
  });
});
