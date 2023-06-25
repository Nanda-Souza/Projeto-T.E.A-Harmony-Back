import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { usersPost, usersUpdate } from '@/controllers';

const usersRouter = Router();

usersRouter    
    .post('/', validateBody(createUserSchema), usersPost)
    .all('/*', authenticateToken)
    .post('/profile', validateBody(createUserSchema), usersUpdate);

export { usersRouter };
