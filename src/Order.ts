import { CartItem, Payment, OrderStatus, Order } from "./type";
import { isCardPayment, isCashPayment, isPointPayment } from "./guards";


export class OrderProcessor {

    createOrder(id: number, items: CartItem[], payment: Payment): Order {
        let totalPrice = 0;
        items.forEach(([product, quantity]) => {
            totalPrice += product.price * quantity
        })

        return {
            id: id,
            items: items,
            totalPrice: totalPrice,
            status: OrderStatus.PENDING,
            payment: payment
        }
    }

    processPayment(payment: Payment): string {

        switch (payment.tag) {
            case "CARD":
                // 여기서 payment는 자동으로 CardPayment로 타입 좁히기 완료!
                return `카드 결제 승인: 카드번호 [${payment.cardNumber}], [${payment.installment}]개월 할부`;
            case "CASH":
                // 여기서 payment는 자동으로 CashPayment로 타입 좁히기 완료!
                return `현금 결제 완료: [${payment.receivedAmount}]원 입금 확인`;
            case "POINT":
                // 여기서 payment는 자동으로 PointPayment로 타입 좁히기 완료!
                return `포인트 결제 완료: [${payment.pointAmount}]점 차감`;
            default:
                //변수 이름 앞에 _를 붙여주면 경고 안띄움 
                const _exhaustiveCheck: never = payment;
                throw new Error(`알 수 없는 결제 수단입니다: ${_exhaustiveCheck}`);
        }
        // if (isCardPayment(payment)) {
        //     return `카드 결제 승인: 카드번호 [${payment.cardNumber}], [${payment.installment}]개월 할부`
        // }

        // if (isCashPayment(payment)) {
        //     return `현금 결제 완료: [${payment.receivedAmount}]원 입금 확인`
        // }
        // return `포인트 결제 완료: [${payment.pointAmount}]점 차감`
    }

    updateStatus(order: Order, newStatus: OrderStatus) {
        order.status = newStatus
    }
}
