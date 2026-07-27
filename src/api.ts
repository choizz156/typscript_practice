import { ProductItem } from "./Product";
import { Order, OrderStatus, Product, Category } from "./type";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export const fetchProductsAsync = (category?: Category): Promise<ApiResponse<ProductItem[]>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`요청된 카테고리: ${category}`);

            resolve({
                success: true,
                data: [
                    new ProductItem(1, "노트북", 1000000, Category.ELECTRONICS),
                    new ProductItem(2, "티셔츠", 30000, Category.CLOTHING)
                ]
            });
        }, 1000);
    });
};

export const processOrderAsync = (order: Order): Promise<ApiResponse<Order>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: order
            });
        }, 1000);
    });
};