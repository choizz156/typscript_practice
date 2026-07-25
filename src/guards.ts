import { Payment, CardPayment, CashPayment, PointPayment, Product } from "./type";

export function isCardPayment(payment: Payment): payment is CardPayment{
    return payment.tag === "CARD"
}

export function isCashPayment(payment: Payment): payment is CashPayment{
    return payment.tag === "CASH"
}

export function isPointPayment(payment: Payment): payment is PointPayment{
    return payment.tag === "POINT"
}

export function isValidProduct(input: unknown): input is Product{
     return typeof input === "object" 
        && input !== null
        && "id" in input
        && "name" in input
        && "price" in input
        && "category" in input
}