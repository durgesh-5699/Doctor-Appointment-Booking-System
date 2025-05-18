import {Router} from "express"
import { addDoctor } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"

const adminRouter = Router() ;

adminRouter.route('/add-doctor').post(upload.single('image'), addDoctor) //? single image upload

export default adminRouter