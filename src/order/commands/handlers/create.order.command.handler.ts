import { OrderRepository } from "../../order.repository";
import { CreateOrderCommand } from "../models/create.order.command";
import { Handler } from "../../../common/handler/handler";
import { ProductRepository } from "../../../product/product.repository";
import { BadRequestError } from "../../../error-handler/error";

export class CreateOrderCommandHandler implements Handler {

  constructor(private readonly orderRepository: OrderRepository, private readonly productRepository: ProductRepository) {}

  handle = async (command: CreateOrderCommand) => {
    const productIds = command.products.map(product => product.id);
    const products = await this.productRepository.findManyById(productIds);

    for (const product of products) {
      const commandProduct = command.products.find(p => p.id === product.id)
     if (commandProduct && product.stock < commandProduct.stock) {
        throw new BadRequestError(`Cannot create order - insufficient stock level of product with given id: ${product.id} - current stock level: ${product.stock}`);
     }
     commandProduct && await this.productRepository.changeStockQuantity(product.id, -commandProduct.stock);
    }

    return this.orderRepository.create(command);
  };
}
