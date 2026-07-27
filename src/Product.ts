import { ProductUpdateInput } from "./dto";
import { Product, Category } from "./type";

export class ProductItem implements Product {

    constructor(
        public readonly id: number,
        public name: string,
        public price: number,
        public category: Category
    ) {
    }
   
    getInfo(): string {
        return `${this.name} - ${this.price}원`
    }

    //오버로딩
    applyDiscount(discountRate: number): number;
    applyDiscount(couponCode: string): string;

    applyDiscount(target: number | string): number | string {
        if (typeof target === 'string') {
            return `쿠폰${target}이 적용되었습니다.`
        }

        return this.price * ((100 - target) / 100)
    }

    update(input: ProductUpdateInput){
        if(input.name !== undefined) this.name = input.name;
        if(input.price!== undefined) this.price= input.price;
        if(input.category !== undefined) this.category = input.category;
    }
}