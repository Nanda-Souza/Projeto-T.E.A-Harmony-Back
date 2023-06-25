import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ email, password, name, img_url }: CreateUserParams): Promise<User> {  
  
  await validateUniqueEmailOrFail(email);
  
  const hashedPassword = await bcrypt.hash(password, 12);
 
  return userRepository.create({
    email,
    password: hashedPassword,    
    name,
    img_url
  });
}

export async function updateUser({id, email, password, name, img_url }: UpdateUserParams): Promise<User> {  

  await validateUniqueEmailOnUPdate(email, id);
  
  const hashedPassword = await bcrypt.hash(password, 12);
 
  return userRepository.update(
    id,
    {    
    email,
    password: hashedPassword,    
    name,
    img_url
  });    
  
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);  
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function validateUniqueEmailOnUPdate(email: string, id: number) {
  const userWithSameEmail = await userRepository.findByEmailOnUPdate(email, id);  
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'name' | 'password' | 'img_url'>;

export type UpdateUserParams = Exclude<User, 'createdAt' | 'updatedAt'>;

const userService = {
  createUser,
  updateUser
};

export * from './errors';
export default userService;
