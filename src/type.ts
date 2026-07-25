export enum Category {
    FOOD, CLOTHING, ELECTRONICS
}

export enum OrderStatus {
    PENDING, PAID, SHIPPING, DELIVERED, CANCELLED
}

export interface Product {
    readonly id: number;
    name: string;
    price: number;
    category: Category
}

export type CartItem = [Product, number]

export type CardPayment = {
    tag: "CARD";
    cardNumber: string;
    installment: number;
}

export type CashPayment = {
    tag: "CASH";
    receivedAmount: number;
}

export type PointPayment = {
    tag: "POINT";
    pointAmount: number;
}

export type Payment = CardPayment | CashPayment | PointPayment

export type CouponBook = {
    [key: string]: number;
}