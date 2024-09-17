import { Request, Response, Router } from "express";
import { CreateOrderCommand } from "./commands/models/create.order.command";
import { HandlerInvoker } from "../common/handler/handler.invoker";
import { CommandQueryTypes } from "../common/command.query.types";
import { validateOrderCreationSchema } from "./input-validator/validation.middleware";

const ORDER_PATH = "/orders"

export class OrderController {
  router: Router = Router();

  constructor(private readonly handlerInvoker: HandlerInvoker) {
    this.router.post(ORDER_PATH, validateOrderCreationSchema, (request: Request, response: Response) => this.create(request.body).then(() => response.sendStatus(201)));
  }

  create = (command: CreateOrderCommand) => this.handlerInvoker.invoke(CommandQueryTypes.CREATE_ORDER, command);
}
