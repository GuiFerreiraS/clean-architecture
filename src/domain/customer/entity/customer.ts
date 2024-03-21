import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;
  private eventDispatcher: EventDispatcherInterface;

  constructor(
    id: string,
    name: string,
    eventDispatcher?: EventDispatcherInterface
  ) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }

    this.eventDispatcher = eventDispatcher;

    const customerCreatedEvent = new CustomerCreatedEvent({ id, name });
    eventDispatcher?.notify(customerCreatedEvent);
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id cannot be empty",
      });
    }
    if (this._name.length < 3) {
      this.notification.addError({
        context: "customer",
        message: "Name must be at least 3 characters long",
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(this);
    this.eventDispatcher?.notify(customerAddressChangedEvent);
  }

  addRewardPoints(points: number): number {
    this._rewardPoints += points;
    return this._rewardPoints;
  }

  activate() {
    if (!this._address) {
      throw new Error("Address cannot be empty");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }
}
