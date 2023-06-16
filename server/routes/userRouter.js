import {Router} from 'express';
import { register,login, updateProfile } from '../../../WanderStay/server/controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter=Router();
userRouter.post('/register',register)
userRouter.post('/login', login);
userRouter.patch('/updateProfile',auth,updateProfile);

export default userRouter;