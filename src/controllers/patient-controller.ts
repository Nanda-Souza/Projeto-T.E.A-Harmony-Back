import { Response, NextFunction} from 'express';
import httpStatus from 'http-status';
import patientService, { CreatePatientParams } from '@/services/patient-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function patientPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { name, age, diagnostic_date, doctor_name, email } = req.body as CreatePatientParams;

  try {    
    const patient = await patientService.createPatient({
      userId,
      name,    
      age,
      diagnostic_date,
      doctor_name,
      email
  });   

    return res.status(httpStatus.OK).json({      
      id: patient.id,
      userId: patient.userId,
      name: patient.name,
      age: patient.age,
      diagnostic_date: patient.diagnostic_date,
      doctor_name: patient.doctor_name,
      email: patient.email      
    });
  } catch (e) {
    next(e);
  }
}