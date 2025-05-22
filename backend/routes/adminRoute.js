import {Router} from "express"
import * as adminController from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import { authAdmin } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = Router() ;

adminRouter.route('/add-doctor').post(authAdmin,upload.single('image'), adminController.addDoctor) //? single image upload
adminRouter.route("/login").post(adminController.loginAdmin)
adminRouter.route("/all-doctors").post(authAdmin ,adminController.allDoctors)
adminRouter.route("/change-availability").post(authAdmin,changeAvailability)

export default adminRouter