import {Router} from 'express';
import * as doctorController from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = Router();

doctorRouter.route('/list').get(doctorController.doctorList)
doctorRouter.route('/login').post(doctorController.loginDoctor)
doctorRouter.route('/appointments').get(authDoctor,doctorController.appointmentsDoctor)
doctorRouter.route('/complete-appointment').post(authDoctor,doctorController.appointmentComplete)
doctorRouter.route('/cancel-appointment').post(authDoctor,doctorController.appointmentCancel)
doctorRouter.route('/dashboard').get(authDoctor,doctorController.doctorDashboard)
doctorRouter.route('/profile').get(authDoctor,doctorController.doctorProfile)
doctorRouter.route('/update-profile').post(authDoctor,doctorController.updateDoctorProfile)
export default doctorRouter