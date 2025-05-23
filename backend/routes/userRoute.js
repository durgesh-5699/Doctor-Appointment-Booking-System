import {Router} from 'express';
import * as userController from '../controllers/userController.js'

const userRouter = Router()

userRouter.route('/register').post(userController.registerUser)
userRouter.route('/login').post(userController.loginUSer)

export default userRouter

