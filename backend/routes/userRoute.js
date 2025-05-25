import {Router} from 'express';
import * as userController from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'

const userRouter = Router()

userRouter.route('/register').post(userController.registerUser)
userRouter.route('/login').post(userController.loginUSer)
userRouter.route('/get-profile').get(authUser , userController.getProfile)
userRouter.route('/update-profile').post(upload.single('image'), authUser, userController.updateProfile)
userRouter.route("/book-appointment").post(authUser,userController.bookAppointment)

export default userRouter

