import { UserAuthInfoRequest } from "../utils/requestTypes";
import {
  getUserById,
  login,
  register,
  changeUserPassword,
} from "../services/userService";
import { NextFunction, Request, Response } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const { returnData, token } = await login({ username, password });

    res.json({ message: "Successfuly logged in!", token, user: returnData });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const { returnData, token } = await register(data);

    res.json({ message: "Successfully registered!", token });
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await changeUserPassword(newPassword, req.user?.username!, oldPassword);

    res.send("Successfully changed password!");
  } catch (error) {
    next(error);
  }
};
export const getLoggedInUser = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
