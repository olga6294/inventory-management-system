import { GetAllProductsQueryHandler } from "../../product/queries/handlers/get.all.products.query.handler";
import { ProductRepository } from "../../product/product.repository";
import { CreateProductCommandHandler } from "../../product/commands/handlers/create.product.command.handler";
import { Handler } from "./handler";
import { OrderRepository } from "../../order/order.repository";
import { CommandQueryTypes } from "../command.query.types";
import { CreateOrderCommandHandler } from "../../order/commands/handlers/create.order.command.handler";
import { RestockProductCommandHandler } from "../../product/commands/handlers/restock.product.command.handler";
import { SellProductCommandHandler } from "../../product/commands/handlers/sell.product.command.handler";

export class HandlerFactory {

  constructor(private readonly productRepository: ProductRepository, private readonly orderRepository: OrderRepository) {}

  getHandler = (type: CommandQueryTypes): Handler => {
    switch (type) {
      case CommandQueryTypes.GET_ALL_PRODUCTS:
        return new GetAllProductsQueryHandler(this.productRepository);
      case CommandQueryTypes.CREATE_PRODUCT:
        return new CreateProductCommandHandler(this.productRepository);
      case CommandQueryTypes.RESTOCK_PRODUCT:
        return new RestockProductCommandHandler(this.productRepository);
      case CommandQueryTypes.SELL_PRODUCT:
        return new SellProductCommandHandler(this.productRepository);
      case CommandQueryTypes.CREATE_ORDER:
        return new CreateOrderCommandHandler(this.orderRepository, this.productRepository);
      default:
        throw new Error(`Command/Query handler of type ${type} does not exist`);
    }
  }
}
