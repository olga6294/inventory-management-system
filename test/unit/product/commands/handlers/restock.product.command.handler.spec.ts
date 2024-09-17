import { RestockProductCommandHandler } from "../../../../../src/product/commands/handlers/restock.product.command.handler";
import { productRepositoryMock } from "../../../../utils/mocks";
import { getRandomProduct } from "../../../order/commands/handlers/utils";
import { randomNumber, randomString } from "../../../../utils/utils";
import { NotFoundError } from "../../../../../src/error-handler/error";

describe("restock product command handler unit tests", () => {

  const restockProductCommandHandler = new RestockProductCommandHandler(productRepositoryMock);

  it("should restock product if it exists in a database", async () => {
    const randomProduct = getRandomProduct()
    const quantity = randomNumber();
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(randomProduct);

    await restockProductCommandHandler.handle({id: randomProduct.id, quantity});

    expect(productRepositoryMock.changeStockQuantity).toBeCalledTimes(1);
    expect(productRepositoryMock.changeStockQuantity).toBeCalledWith(randomProduct.id, quantity);
  });

  it("should not modify database if product does not exist", async () => {
    productRepositoryMock.findOne = jest.fn().mockResolvedValue(null);

    await expect(restockProductCommandHandler.handle({id: randomString(), quantity: randomNumber()})).rejects.toThrowError(NotFoundError);
  })
});
