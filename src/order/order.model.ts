import { Product } from "../product/product.model";

export type Order = {
  customerId: string;
  products: Product[];
}
