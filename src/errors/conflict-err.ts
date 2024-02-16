import { StatusCodes } from 'http-status-codes';

const ERROR_CODE = StatusCodes.CONFLICT;

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

export default ConflictError;
