import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';
import UnAuthError from '../errors/unauth-err';

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
) => {
  const _id = req.params.userId === 'me' ? req.body.user._id : req.params.userId;
  return User.findById(_id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные.'));
      next(err);
    });
};

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    User.create(
      {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      },
    )
      .then((user) => {
        const { password, ...rest } = JSON.parse(JSON.stringify(user));
        res.status(StatusCodes.CREATED).send(rest);
      })
      .catch((err) => {
        if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        if (err.name === 'ValidationError') next(new BadRequestError(err.message));
        next(err);
      });
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
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    if (err.name === 'ValidationError') next(new BadRequestError(err.message));
    next(err);
  });

export const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findByIdAndUpdate(
  req.body.user._id,
  { avatar: req.body.avatar },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден.');
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
    if (err.name === 'ValidationError') next(new BadRequestError(err.message));
    next(err);
  });

export const login = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findUserByCredentials(req.body.email, req.body.password)
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      'secret-key',
      { expiresIn: '7d' },
    );

    // Send token over cookie
    res.cookie('access-token', `Bearer ${token}`, {
      maxAge: 1000 * 60 * 15, // 15 minutes
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
    });
    res.status(StatusCodes.OK).send({ success: 'true' });

    // Send token in body
    // res.status(StatusCodes.OK).send({ token });
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new UnAuthError(err.message));
    next(err);
  });
