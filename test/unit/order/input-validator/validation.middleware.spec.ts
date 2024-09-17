import { Request, Response, NextFunction } from "express";
import { validateOrderCreationSchema } from "../../../../src/order/input-validator/validation.middleware";
import { getRandomCreateOrderCommand, getRandomProduct } from "../commands/handlers/utils";
import { ErrorCode } from "../../../../src/error-handler/error";
import { randomNumber } from "../../../utils/utils";

describe("order creation command input validation unit tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  it("should pass validation process", async () => {
    mockRequest = { body: getRandomCreateOrderCommand() };
    await validateOrderCreationSchema(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    )

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith();
  })

  it("should fail validation process", async () => {
    mockRequest = { body: {customerId: randomNumber(), products: [getRandomProduct()]} };
    await validateOrderCreationSchema(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(expect.objectContaining({
      code: ErrorCode.BAD_REQUEST
    }))
  })
});
