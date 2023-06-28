import Joi from 'joi';
import { CreatePatientPostParams } from '@/services/patient-service';

export const createPatientSchema = Joi.object<CreatePatientPostParams>({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().min(0).max(100).required(),
  diagnostic_date: Joi.date().required(),  
  doctor_name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});
