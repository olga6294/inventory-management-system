import { randomNumber, randomString } from "../../../../utils/utils";
import { Product } from "../../../../../src/product/product.model";
import { CreateOrderCommand } from "../../../../../src/order/commands/models/create.order.command";

export const getRandomProduct = (product?: Partial<Product>): Product => ({
  id: randomString(),
  name: randomString(),
  description: randomString(),
  price: randomNumber(),
  stock: randomNumber(),
  ...product
})

export const getRandomCreateOrderCommand = (order?: Partial<CreateOrderCommand>): CreateOrderCommand => ({
  customerId: randomString(),
  products: [
    getRandomProduct()
  ],
  ...order
});
