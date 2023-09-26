import { prisma } from "../database/database";
import uuid from "uuid";
export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  return await prisma.user.findUnique({
    where: {
      username: userData.username,
      password: userData.password,
    },
  });
};

export const register = async (userData: {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "USER" | "TRAINER";
}) => {
  await prisma.user.create({ data: { id: uuid.v4(), ...userData } });
};
