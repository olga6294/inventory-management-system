import { HandlerFactory } from "./handler.factory";
import { CommandQueryTypes } from "../command.query.types";

export class HandlerInvoker {

  constructor(private readonly handlerFactory: HandlerFactory) {}

  invoke = (type: CommandQueryTypes, command?: any) => this.handlerFactory.getHandler(type).handle(command);

}
