import { Product } from "../../../product/product.model";

export interface CreateOrderCommand {
  customerId: string;
  products: Product[];
}
