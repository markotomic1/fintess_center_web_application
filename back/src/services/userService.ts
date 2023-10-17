import { CustomError } from "../utils/customError";
import { prisma } from "../database/database";
import bcrypt from "bcrypt";
import validator from "validator";
import { generateToken } from "../utils/jwtUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

//get user by specified id

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw new CustomError("No user found!", 400);

  const { id, password, ...userData } = user;

  return userData;
};

//login with provided username and password
export const login = async (userData: {
  username: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { username: userData.username },
  });

  if (!user) throw new CustomError("Unable to login!", 400);

  const passwordCorrect = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!passwordCorrect) throw new CustomError("Unable to login!", 400);

  const token = generateToken(user.username);

  const { id, password, ...returnData } = user;

  return { token, returnData };
};

//register user

export const register = async (userData: {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "USER" | "TRAINER";
}) => {
  try {
    if (!validator.isEmail(userData.email))
      throw new CustomError("Invalid email address!", 400);

    if (userData.password.trim().length < 6)
      throw new CustomError("Password not long enough!", 400);

    if (
      !validator.isAlphanumeric(userData.username) ||
      userData.username.trim().length < 6
    )
      throw new CustomError("Username not valid!", 400);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    if (!user) throw new CustomError("Unable to register!", 400);

    const token = generateToken(userData.username);

    const { id, password, ...returnData } = user;

    return { returnData, token };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new CustomError("Unable to create user!", 400);
    }
    throw error;
  }
};

//change user password
export const changeUserPassword = async (
  newPassword: string,
  username: string,
  oldPassword: string
) => {
  if (newPassword.trim().length < 6)
    throw new CustomError("New password not valid!", 400);

  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { password: true },
  });
  if (!user) throw new CustomError("User not found!", 404);

  const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

  if (!passwordIsValid) throw new CustomError("Old password not valid!", 400);

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { username: username },
    data: { password: hashedNewPassword },
    select: { username: true },
  });
};
