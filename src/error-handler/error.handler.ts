import { Request, Response, NextFunction } from "express";
import { AppError } from "./error";

interface ErrorHandler {
  (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void;
}

export const httpErrorHandler: ErrorHandler = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { code, details } = error;

  const errorResponse = {
    message: details,
  };

  response.status(code.valueOf()).json(errorResponse);
};
