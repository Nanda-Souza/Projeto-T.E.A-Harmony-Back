import { Patient, Prisma } from '@prisma/client';
import { prisma } from '@/config';


async function create(data: Prisma.PatientUncheckedCreateInput) {
  const { userId, name, age, diagnostic_date, doctor_name, email } = data;

  const diagnosticDate = new Date(diagnostic_date);

  const updatedAt = new Date();
  
  return prisma.patient.create({
    data: {      
      name,
      age,
      diagnostic_date: diagnosticDate,
      doctor_name,
      email,
      updatedAt,
      User: {
        connect: {id: userId}
      }
    }
  });
  
}

async function validateUniquePatientOrFail(userId: number, name: string) {

  return prisma.patient.findFirst({
    where: {
      userId,
      name
    },
  });
}

const patientRepository = {
  create,  
  validateUniquePatientOrFail
};

export default patientRepository;
