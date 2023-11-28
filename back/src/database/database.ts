import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export const prisma = new PrismaClient().$extends({
  name: "extension",
  model: {
    user: {
      async signUp(userdata: {
        name: string;
        surname: string;
        email: string;
        username: string;
        password: string;
        role?: "ADMIN" | "USER" | "TRAINER";
      }) {
        const hashedPassword = await bcrypt.hash(userdata.password, 10);

        const user = await prisma.user.create({
          data: {
            ...userdata,
            password: hashedPassword,
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/diplomski-firebase-storage.appspot.com/o/images%2Fdefault__image.png?alt=media&token=72ca3e46-6de4-4ada-9af3-12ddfda0f744",
          },
        });
        return user;
      },
    },
  },
});

async function createAdminUser() {
  try {
    await prisma.$connect();
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });
    if (!adminUser) {
      const newAdminUser = await prisma.user.signUp({
        email: "admin@gmail.com",
        name: "Admin",
        surname: "Admin",
        username: "admin123",
        password: "admin123",
        role: "ADMIN",
      });
      console.log("Admin user has been created!");
    }
  } catch (error) {
    console.error("Error connecting to database!", error);
  }
}
createAdminUser();
