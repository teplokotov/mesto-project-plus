import { StatusCodes } from 'http-status-codes';

const ERROR_CODE = StatusCodes.NOT_FOUND;

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

export default NotFoundError;
