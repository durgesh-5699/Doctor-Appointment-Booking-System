import {Router} from "express"
import * as adminController from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import { authAdmin } from "../middlewares/authAdmin.js";

const adminRouter = Router() ;

adminRouter.route('/add-doctor').post(authAdmin,upload.single('image'), adminController.addDoctor) //? single image upload
adminRouter.route("/login").post(adminController.loginAdmin)

export default adminRouter