import { ProductRepository } from "../../product.repository";
import { RestockProductCommand } from "../models/product.command";
import { Handler } from "../../../common/handler/handler";
import { NotFoundError } from "../../../error-handler/error";

export class RestockProductCommandHandler implements Handler {

  constructor(private readonly productRepository: ProductRepository) {}

  handle = (command: RestockProductCommand) => this.productRepository.findOne(command.id)
      .then(product => {
        if (product)
          return this.productRepository.changeStockQuantity(command.id, command.quantity);
        throw new NotFoundError(`Product with given id: ${command.id} is not found`);
      });

}
