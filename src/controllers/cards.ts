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
