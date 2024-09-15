import { CreateOrderCommandHandler } from "../../../../../src/order/commands/handlers/create.order.command.handler";
import { orderRepositoryMock, productRepositoryMock } from "../../../../utils/mocks";
import { getRandomCreateOrderCommand, getRandomProduct } from "./utils";
import { BadRequestError } from "../../../../../src/error-handler/error";

describe("create order command handler unit tests", () => {
  const createOrderCommandHandler = new CreateOrderCommandHandler(orderRepositoryMock, productRepositoryMock)

  it("should create order", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findManyById = jest.fn().mockResolvedValue([randomProduct]);

    await createOrderCommandHandler.handle(getRandomCreateOrderCommand({products: [{...randomProduct, stock: randomProduct.stock-1}]}));

    expect(productRepositoryMock.changeStockQuantity).toBeCalledTimes(1);
    expect(orderRepositoryMock.create).toBeCalledTimes(1);
  });

  it("should not create order for insufficient product stock", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findManyById = jest.fn().mockResolvedValue([randomProduct]);

    await expect(createOrderCommandHandler.handle(getRandomCreateOrderCommand({products: [{...randomProduct, stock: randomProduct.stock+1}]}))).rejects.toThrowError(BadRequestError)
  });
})
