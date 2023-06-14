import {Router} from 'express';
import { register } from '../../../WanderStay/server/controllers/user.js';

const userRouter=Router();
userRouter.post('/register',register)

export default userRouter;