import { ProductRepository } from "../../product.repository";
import { Handler } from "../../../common/handler/handler";

export class GetAllProductsQueryHandler implements Handler {

  constructor(private readonly productRepository: ProductRepository) {}

  handle = () => this.productRepository.findAll();

}
