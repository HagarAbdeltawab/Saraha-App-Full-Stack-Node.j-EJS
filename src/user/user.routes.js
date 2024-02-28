import express from 'express'; 
import { handleUser, userController } from './user.controller.js';
const userRouter = express.Router();

userRouter.get('/user/:id',userController)
userRouter.post('/handleUser/:id',handleUser)

export default userRouter