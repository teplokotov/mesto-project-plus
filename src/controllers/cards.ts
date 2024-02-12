import { Request, Response, NextFunction } from 'express';

import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';

export const getCards = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка с указанным _id не найдена.');
    res.send(card);
  })
  .catch(next);

export const createCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.create(
  {
    name: req.body.name,
    link: req.body.link,
    owner: req.body.user._id,
  },
  {
    runValidators: true,
  },
)
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
    if (err.name === 'ValidationError') next(new BadRequestError(err.message));
    next(err);
  });

export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) throw new NotFoundError('Передан несуществующий _id карточки.');
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    next(err);
  });

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) throw new NotFoundError('Передан несуществующий _id карточки.');
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
    next(err);
  });
