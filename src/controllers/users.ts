import { Request, Response, NextFunction } from 'express';

import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';

export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
    res.send(user);
  })
  .catch(next);

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.create({
  name: req.body.name,
  about: req.body.about,
  avatar: req.body.avatar,
})
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
    next(err);
  });

export const updateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.body.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  { new: true },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
    next(err);
  });

export const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.body.user._id,
  { avatar: req.body.avatar },
  { new: true },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
    next(err);
  });
