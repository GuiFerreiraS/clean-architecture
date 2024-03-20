import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { address: Address, id, name } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${Address.street} - ${Address.city} ,${Address.number}.`
    );
  }
}
