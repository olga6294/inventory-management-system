import { ProductRepository } from "../../product.repository";
import { CreateProductCommand } from "../models/product.command";
import { Handler } from "../../../common/handler/handler";
import { v4 as uuid } from 'uuid';

export class CreateProductCommandHandler implements Handler {

  constructor(private readonly productRepository: ProductRepository) {
  }

  handle = async (command: CreateProductCommand) => this.productRepository.create({id: uuid(), ...command});
}
