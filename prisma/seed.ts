import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findFirst();
  if (!user) {
    const password = "123456";

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await prisma.user.create({
      data: {
        name: "Nanda",
        email: "f@f.com",
        password: hashedPassword,
        img_url: "https://caesegatos.com.br/wp-content/uploads/2023/01/the-gold-bengal-cat-on-white-background-1024x683.jpg",        
      },
    });
  }
} 
  
  

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
