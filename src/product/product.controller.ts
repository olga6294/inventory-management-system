import { Request, Response, Router } from "express";
import { CreateProductCommand, UpdateProductQuantityDto } from "./commands/models/product.command";
import { Product } from "./product.model";
import { CommandQueryTypes } from "../common/command.query.types";
import { HandlerInvoker } from "../common/handler/handler.invoker";
import { validateProductCreationSchema, validateProductRestockAndSellSchema } from "./input-validator/validation.middleware";

const PRODUCTS_PATH = "/products"

export class ProductController {
  router: Router = Router();

  constructor(private readonly handlerInvoker: HandlerInvoker) {
    this.router.get(PRODUCTS_PATH, (request: Request, response: Response) => this.getAll().then((products: Product[]) => response.json(products)));
    this.router.post(PRODUCTS_PATH, validateProductCreationSchema, (request: Request, response: Response) => this.create(request.body).then(() => response.sendStatus(201)));
    this.router.post(`${PRODUCTS_PATH}/:id/restock`, validateProductRestockAndSellSchema, (request: Request, response: Response) => this.restock(request.params.id, request.body).then(() => response.sendStatus(200)));
    this.router.post(`${PRODUCTS_PATH}/:id/sell`, validateProductRestockAndSellSchema, (request: Request, response: Response) => this.sell(request.params.id, request.body).then(() => response.sendStatus(200)));
  }

  getAll = (): Promise<Product[]> => this.handlerInvoker.invoke(CommandQueryTypes.GET_ALL_PRODUCTS)
  create =(command: CreateProductCommand): Promise<void> => this.handlerInvoker.invoke(CommandQueryTypes.CREATE_PRODUCT, command);
  restock = (id: string, updateProductQuantityDto: UpdateProductQuantityDto): Promise<void> => this.handlerInvoker.invoke(CommandQueryTypes.RESTOCK_PRODUCT, {id, quantity: updateProductQuantityDto.quantity});
  sell = (id: string, updateProductQuantityDto: UpdateProductQuantityDto): Promise<void> => this.handlerInvoker.invoke(CommandQueryTypes.SELL_PRODUCT, {id, quantity: updateProductQuantityDto.quantity});
}
