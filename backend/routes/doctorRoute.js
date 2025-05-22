import {Router} from 'express';
import * as doctorController from '../controllers/doctorController.js';

const doctorRoute = Router();

doctorRoute.route('/list').get(doctorController.doctorList)

export default doctorRoute 