import { Category, OrderStatus, CardPayment, CouponBook } from "./type";
import { ProductItem } from "./Product";
import { Cart } from "./Cart";
import { OrderProcessor } from "./Order";


const tshirt = new ProductItem(1, "티셔츠", 30000, Category.CLOTHING);
const laptop = new ProductItem(2, "노트북", 1000000, Category.ELECTRONICS);
const apple = new ProductItem(3, "사과", 5000, Category.FOOD);

console.log(tshirt.getInfo());
console.log(laptop.getInfo());
console.log(apple.getInfo());

console.log(tshirt.applyDiscount(10));
console.log(tshirt.applyDiscount("특별확인"));

const cart = new Cart()
cart.addItem(tshirt, 2);
cart.addItem(laptop, 1);

console.log(`총 금액 : ${cart.getTotalPrice()}`);

const cardPayment: CardPayment = {
    tag: "CARD",
    cardNumber: "123-234-234",
    installment: 3
}

const processor = new OrderProcessor();
const order = processor.createOrder(101, cart.getItems(), cardPayment);

console.log(processor.processPayment(order.payment)); // 결제 메시지 출력
console.log("현재 주문 상태:", order.status);         // PENDING 출력

processor.updateStatus(order, OrderStatus.PAID);
console.log("변경된 주문 상태:", OrderStatus[order.status]); 