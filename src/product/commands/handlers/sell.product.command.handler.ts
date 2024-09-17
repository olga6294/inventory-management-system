import { ProductRepository } from "../../product.repository";
import { SellProductCommand } from "../models/product.command";
import { Handler } from "../../../common/handler/handler";
import { BadRequestError, NotFoundError } from "../../../error-handler/error";

export class SellProductCommandHandler implements Handler {

  constructor(private readonly productRepository: ProductRepository) {}

  handle = (command: SellProductCommand) => this.productRepository.findOne(command.id)
      .then(result => {
        if(result && result.stock >= 0)
          return result.stock
        throw new NotFoundError(`Product with given id ${command.id} is not found`);
      })
      .then(stock => {
        if(stock && stock >= command.quantity)
          return this.productRepository.changeStockQuantity(command.id, -command.quantity);
        throw new BadRequestError(`Cannot sell product with id ${command.id} - too low stock level - current stock level: ${stock}`);
      })

}
