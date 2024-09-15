import { SellProductCommandHandler } from "../../../../../src/product/commands/handlers/sell.product.command.handler";
import { productRepositoryMock } from "../../../../utils/mocks";
import { getRandomProduct } from "../../../order/commands/handlers/utils";
import { BadRequestError, NotFoundError } from "../../../../../src/error-handler/error";

describe("sell product command handler unit tests", () => {

  const sellProductCommandHandler = new SellProductCommandHandler(productRepositoryMock)

  it("should sell product when product stock is higher that command quantity", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(randomProduct);

    await sellProductCommandHandler.handle({id: randomProduct.id, quantity: randomProduct.stock-2});

    expect(productRepositoryMock.changeStockQuantity).toBeCalledTimes(1);
    expect(productRepositoryMock.changeStockQuantity).toBeCalledWith(randomProduct.id, -(randomProduct.stock-2));
  });

  it("should sell product when product stock is equal to command quantity", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(randomProduct);

    await sellProductCommandHandler.handle({id: randomProduct.id, quantity: randomProduct.stock});

    expect(productRepositoryMock.changeStockQuantity).toBeCalledTimes(1);
    expect(productRepositoryMock.changeStockQuantity).toBeCalledWith(randomProduct.id, -randomProduct.stock);
  });

  it("should throw not found error when product is missing from the database", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(null);

    await expect(sellProductCommandHandler.handle({id: randomProduct.id, quantity: randomProduct.stock-2})).rejects.toThrowError(NotFoundError);
  });

  it("should throw bad request error when product stock is insufficient", async () => {
    const randomProduct = getRandomProduct();
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(randomProduct);

    await expect(sellProductCommandHandler.handle({id: randomProduct.id, quantity: randomProduct.stock+2})).rejects.toThrowError(BadRequestError);

  });
})
