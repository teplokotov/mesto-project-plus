import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../config';
import UnAuthError from '../errors/unauth-err';

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  // const { authorization } = req.headers;

  // Get token from cookies
  const authorization = req.cookies['access-token'];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    next(new UnAuthError('Необходима авторизация'));
  }

  req.body.user = payload; // { _id: string; iat: number; exp: number }

  next();
};

export default auth;
