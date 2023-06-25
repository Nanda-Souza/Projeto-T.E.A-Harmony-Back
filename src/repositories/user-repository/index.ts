import { Prisma } from '@prisma/client';
import { prisma } from '@/config';


async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findByEmailOnUPdate(email: string, id: number) {

  return prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id
      }
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  
  return prisma.user.create({
    data,
  });
  
}

async function update(userId: number, data: Prisma.UserUncheckedCreateInput) {
  
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: data    
  });
  
}

const userRepository = {
  findByEmail,
  findByEmailOnUPdate,
  create,
  update,
};

export default userRepository;
