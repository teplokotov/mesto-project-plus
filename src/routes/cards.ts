import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  createCardValidator,
  deleteCardByIdValidator,
  dislikeCardValidator,
  likeCardValidator,
} from '../validation/cards';

const cardRouter = Router();
cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidator, createCard);
cardRouter.delete('/:cardId', deleteCardByIdValidator, deleteCardById);
cardRouter.put('/:cardId/likes', likeCardValidator, likeCard);
cardRouter.delete('/:cardId/likes', dislikeCardValidator, dislikeCard);

export default cardRouter;
