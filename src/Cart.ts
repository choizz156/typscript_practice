import { Product, CartItem } from "./type";

export class Cart {

    constructor(private items: CartItem[] = []) { }

    addItem(product: Product, quantity: number) {
        const existingItem = this.items.find(item => item[0].id === product.id);
        if (existingItem) {
            existingItem[1] += quantity; // item[1]이 수량이니 수량 증가!
        } else {
            this.items.push([product, quantity]); // 없으면 새로 추가!
        }
    }

    removeItem(productId: number) {
        // this.items = this.items.filter(item => item[0].id !== productId);
        this.items = this.items.filter(([product]) => product.id !== productId);
    }

    getTotalPrice() {
        let total = 0;

        // this.items.forEach((item) => {
        //     const product = item[0];  // 튜플의 0번째 = 상품
        //     const quantity = item[1]; // 튜플의 1번째 = 수량

        //     total += product.price * quantity; // (가격 * 수량)을 계속 더함!
        // });

        //  구조 분해 할당을 쓸 때 
        this.items.forEach(([product, quantity]) => {
            total += product.price * quantity; // 숫자가 싹 사라졌죠?!
        });

        return total;
    }

    getItems(): CartItem[] {
        return this.items;
    }

    clear() {
        this.items = []
    }
}