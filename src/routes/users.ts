import { Router } from 'express';
import { createUser } from '../controllers/users';

const router = Router();
router.post('/users', createUser);

export default router;
