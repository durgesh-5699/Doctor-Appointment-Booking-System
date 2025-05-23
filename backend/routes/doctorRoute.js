import {Router} from 'express';
import * as doctorController from '../controllers/doctorController.js';

const doctorRouter = Router();

doctorRouter.route('/list').get(doctorController.doctorList)

export default doctorRouter