export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  NOT_FOUND = 404
}

export class AppError extends Error {
  code: ErrorCode;
  details?: unknown;
}

export class InternalServerError extends AppError {
  code = ErrorCode.INTERNAL_SERVER_ERROR;

  constructor(public details?: unknown) {
    super();
  }
}

export class BadRequestError extends AppError {
  code = ErrorCode.BAD_REQUEST;

  constructor(public details?: unknown) {
    super();
  }
}

export class NotFoundError extends AppError {
  code = ErrorCode.NOT_FOUND;

  constructor(public details?: unknown) {
    super();
  }
}

export interface InputValidationError {
  key: string;
  path: string;
  value: string;
}
