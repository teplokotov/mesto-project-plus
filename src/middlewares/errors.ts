import { Request, Response, NextFunction } from 'express';

// Если ошибка сгенерирована не нами, у неё не будет свойства `statusCode`.
// > console.log(err.statusCode); // undefined
// В этом случае будем считать произошедшее ошибкой сервера, возвращать
// 500 статус и стандартное сообщение.

interface IError {
  statusCode: number,
  message: string,
}

const errors = (err: IError, req: Request, res: Response, next: NextFunction) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

export default errors;
