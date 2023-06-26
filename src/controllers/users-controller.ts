import { Request, Response, NextFunction} from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function usersPost(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const { email, password, name, img_url } = req.body;

  try {
    
    const user = await userService.createUser({ email, password, name, img_url });
    
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      name: user.name,
      img_url: user.img_url
    });
  } catch (e) {    
    next(e);
  }
}

export async function usersUpdate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {    
    const user = await userService.updateUser({
      id: req.userId,
      ...req.body,      
    });   

    return res.status(httpStatus.OK).json({      
      id: user.id,
      email: user.email,
      name: user.name,
      img_url: user.img_url
    });
  } catch (e) {    
    next(e);
  }
}
