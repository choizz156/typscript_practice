import { Product } from "./type"

export type ProductUpdateInput = Partial<Omit<Product, "id">>
export type ProductSummary = Pick<Product, "id" | "name" | "price">



