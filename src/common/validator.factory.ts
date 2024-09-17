import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { BadRequestError } from "../error-handler/error";

function getInputValidationError(error: yup.ValidationError): BadRequestError {
  return new BadRequestError(
    error.inner.map((validationError) => ({
      key: validationError.message,
      path: validationError.path,
      value: validationError.value,
    }))
  );
}

export function validatorFactory(schema: yup.ObjectSchema<any>) {
  return (request: Request, response: Response, next: NextFunction) => {
    return schema
      .validate(
        { body: request.body, query: request.query, params: request.params },
        {
          abortEarly: false,
          strict: true,
        }
      )
      .then(() => {
        next();
      })
      .catch((error: yup.ValidationError) => {
        next(getInputValidationError(error));
      });
  };
}
