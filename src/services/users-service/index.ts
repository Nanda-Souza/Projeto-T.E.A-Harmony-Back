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

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'name' | 'password' | 'img_url'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
