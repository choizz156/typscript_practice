import { OrderStatus } from "./type"

type statusKey = keyof typeof OrderStatus
export type OrderEventType = `on_${statusKey}_order`

export type OrderEventListener = (event: OrderEventType, orderId: number) => void;

export class OrderEventEmitter {
    private listeners: OrderEventListener[] = [];

    on(listener: OrderEventListener) {
        this.listeners.push(listener);
    }

    emit(status: OrderStatus, orderId: number) {
        const eventName = `on_${OrderStatus[status]}_order` as OrderEventType;
        this.listeners.forEach((listener) => {
            listener(eventName, orderId);
        });
    }
}