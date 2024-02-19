import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';
import {
  getUserByIdValidator,
  updateUserAvatarValidator,
  updateUserInfoValidator,
} from '../validation/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUserById);
userRouter.get('/:userId', getUserByIdValidator, getUserById);
userRouter.patch('/me', updateUserInfoValidator, updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

export default userRouter;
