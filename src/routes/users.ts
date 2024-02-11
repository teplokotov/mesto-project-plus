import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
