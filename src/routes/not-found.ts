import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-err';

const notFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

export default notFoundRoute;
