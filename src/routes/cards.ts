import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
} from '../controllers/cards';

const cardRouter = Router();
cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCardById);

export default cardRouter;
