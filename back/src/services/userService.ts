import { CustomError } from "../utils/customError";
import { prisma } from "../database/database";
import bcrypt from "bcrypt";
import validator from "validator";
import { generateToken } from "../utils/jwtUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUser } from "../utils/types";

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
  role?: "ADMIN" | "USER" | "TRAINER";
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

    const user = await prisma.user.signUp(userData);
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
  try {
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
  } catch (error: any) {
    throw error;
  }
};

//update user profile

export const updateUser = async (
  user: UpdateUser,
  oldUsername?: string,
  oldEmail?: string
) => {
  try {
    if (!validator.isEmail(user.email))
      throw new CustomError("Invalid email address!", 400);

    if (
      !validator.isAlphanumeric(user.username) ||
      user.username.trim().length < 6
    )
      throw new CustomError("Username not valid!", 400);

    if (oldUsername !== "" && oldEmail !== "") {
      const updatedUser = await prisma.user.update({
        where: { username: oldUsername, email: oldEmail },
        data: user,
      });

      const newToken = generateToken(user.username);
      return { updatedUser, token: newToken };
    } else {
      throw new CustomError("Unable to update!", 403);
    }
  } catch (error) {
    throw error;
  }
};

//get logged in user plan

export const getLoggedInUserPlan = async (planId: string) => {
  try {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });

    return plan;
  } catch (error) {
    console.log(error);
    throw new CustomError("Unable to get Plan!", 500);
  }
};
export const purchasePlan = async (
  username: string,
  planId: string,
  startDate: string,
  endDate: string
) => {
  try {
    await prisma.user.update({
      where: { username },
      data: { planId, startDateOfPlan: startDate, endDateOfPlan: endDate },
    });
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to purchase plan!", 400);
  }
};

//store image url in database
export const storeImageUrl = async (username: string, imgUrl: string) => {
  try {
    await prisma.user.update({ where: { username }, data: { imgUrl } });
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to store Url!", 400);
  }
};

//get all users

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ["USER", "TRAINER"] } },
    });
    return users;
  } catch (error) {
    throw new CustomError("Unable to get users!", 400);
  }
};
