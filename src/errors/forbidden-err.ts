import { StatusCodes } from 'http-status-codes';

const ERROR_CODE = StatusCodes.FORBIDDEN;

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

export default ForbiddenError;
