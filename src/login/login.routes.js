import express from 'express'; 
import { handleLogin, loginController } from './login.controller.js';
const loginRouter = express.Router();

loginRouter.get('/login',loginController)

loginRouter.post('/handleLogin',handleLogin)

export default loginRouter