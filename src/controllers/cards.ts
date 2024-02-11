import { Request, Response } from 'express';

import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении списка карточек' }));

export const deleteCardById = (
  req: Request,
  res: Response,
) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      return;
    }
    res.send(card);
  })
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при получении данных пользователя' }));

export const createCard = (req: Request, res: Response) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.body.user._id,
})
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании карточки' }));

export const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.body.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при поставки лайка' }));

export const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.body.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при снятии лайка' }));
