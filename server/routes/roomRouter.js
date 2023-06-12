import { Router } from "express";
import auth from "../middleware/auth.js";
import {createRoom} from '../controllers/room.js'
const roomRouter=Router();

roomRouter.post('/',auth ,createRoom);

export default roomRouter;