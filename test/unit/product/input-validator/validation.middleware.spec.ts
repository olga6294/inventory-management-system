import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../../../../src/error-handler/error";
import { randomNumber, randomString } from "../../../utils/utils";
import { validateProductCreationSchema, validateProductRestockAndSellSchema } from "../../../../src/product/input-validator/validation.middleware";
import { getRandomCreateProductCommand } from "../commands/handlers/utils";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
const nextFunction: NextFunction = jest.fn();

describe("product creation command input validation unit tests", () => {
  it("should pass validation process", async () => {
    mockRequest = { body: getRandomCreateProductCommand() };
    await validateProductCreationSchema(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    )

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith();
  })

  it("should fail validation process", async () => {
    mockRequest = { body: {name: randomNumber(), description: randomString(), stock: -randomNumber()}};
    await validateProductCreationSchema(
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

describe("product restock and sell command input validation unit tests", () => {
  it("should pass validation process", async () => {
    mockRequest = { params: {id: randomString()}, body: {quantity: randomNumber()} };
    await validateProductRestockAndSellSchema(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    )

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith();
  })

  it("should fail validation process", async () => {
    mockRequest = { params: {id: randomString()}, body: {quantity: randomString()} };
    await validateProductRestockAndSellSchema(
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
