import { Patient, User } from '@prisma/client';
import { duplicatedPatientError } from './errors';
import patientRepository from '@/repositories/patient-repository';

export async function createPatient( params: CreatePatientParams): Promise <Patient>{  
  
  const { userId, name, age, diagnostic_date, doctor_name, email } = params;
  
  await validateUniquePatientOrFail(userId, name);

  const patientData = {
    userId,
    name,
    age,
    diagnostic_date,
    doctor_name,
    email    
  };
 
  return patientRepository.create(patientData);
}

async function validateUniquePatientOrFail(userId: number, name: string) {
  const userWithSameTherapist = await patientRepository.validateUniquePatientOrFail(userId, name);  
  if (userWithSameTherapist) {
    throw duplicatedPatientError();
  }
}

export type CreatePatientParams = Pick<Patient, 'userId' | 'name' | 'age' | 'diagnostic_date' | 'doctor_name' | 'email'>;

export type CreatePatientPostParams = Pick<Patient, 'name' | 'age' | 'diagnostic_date' | 'doctor_name' | 'email'>;


const patientService = {
  createPatient,  
};

export * from './errors';
export default patientService;
