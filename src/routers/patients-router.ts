import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createPatientSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { patientPost } from '@/controllers';

const patientsRouter = Router();

patientsRouter        
    .all('/*', authenticateToken)
    .post('/create', validateBody(createPatientSchema), patientPost);

export { patientsRouter };
