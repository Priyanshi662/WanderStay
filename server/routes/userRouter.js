import { Router } from 'express';
import {getUsers,login,register,updateProfile,updateStatus} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/updateProfile', auth, updateProfile);
userRouter.get('/', auth, getUsers);
userRouter.patch(
  '/updateStatus/:userId',
  auth,
  updateStatus
);

export default userRouter;