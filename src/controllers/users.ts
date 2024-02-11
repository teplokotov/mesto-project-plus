import { Request, Response } from 'express';

import User from '../models/user';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка пользователей' }));

export const getUserById = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((user) => res.send(user))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении данных пользователя' }));

export const createUser = (req: Request, res: Response) => User.create({
  name: req.body.name,
  about: req.body.about,
  avatar: req.body.avatar,
})
  .then((user) => res.send(user))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании пользователя' }));

export const updateUserInfo = (req: Request, res: Response) => User.findByIdAndUpdate(
  req.body.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  { new: true },
)
  .then((user) => res.send(user))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при обновлении данных пользователя' }));

export const updateUserAvatar = (req: Request, res: Response) => User.findByIdAndUpdate(
  req.body.user._id,
  { avatar: req.body.avatar },
  { new: true },
)
  .then((user) => res.send(user))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при обновлении аватара пользователя' }));
