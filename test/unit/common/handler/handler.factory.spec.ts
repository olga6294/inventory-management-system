import { CommandQueryTypes } from "../../../../src/common/command.query.types";
import { CreateProductCommandHandler } from "../../../../src/product/commands/handlers/create.product.command.handler";
import { HandlerFactory } from "../../../../src/common/handler/handler.factory";
import { orderRepositoryMock, productRepositoryMock } from "../../../utils/mocks";
import { GetAllProductsQueryHandler } from "../../../../src/product/queries/handlers/get.all.products.query.handler";
import { RestockProductCommandHandler } from "../../../../src/product/commands/handlers/restock.product.command.handler";
import { SellProductCommandHandler } from "../../../../src/product/commands/handlers/sell.product.command.handler";
import { CreateOrderCommandHandler } from "../../../../src/order/commands/handlers/create.order.command.handler";

describe("handler factory unit tests", () => {

  const handlerFactory = new HandlerFactory(productRepositoryMock, orderRepositoryMock);

  test.each([
    {commandQueryType: CommandQueryTypes.GET_ALL_PRODUCTS, handler: GetAllProductsQueryHandler},
    {commandQueryType: CommandQueryTypes.CREATE_PRODUCT, handler: CreateProductCommandHandler},
    {commandQueryType: CommandQueryTypes.RESTOCK_PRODUCT, handler: RestockProductCommandHandler},
    {commandQueryType: CommandQueryTypes.SELL_PRODUCT, handler: SellProductCommandHandler},
    {commandQueryType: CommandQueryTypes.CREATE_ORDER, handler: CreateOrderCommandHandler}
  ])("should return handler of a proper type", (params) => {
    expect(handlerFactory.getHandler(params.commandQueryType)).toBeInstanceOf(params.handler);
  });
});
