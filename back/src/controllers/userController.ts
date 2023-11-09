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
    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 30 * 3,
        httpOnly: true,
      })
      .json({ message: "Successfuly logged in!", user: returnData });
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
    console.log(token);

    res
      .cookie("token", token, { maxAge: 1000 * 60 * 30 * 3, httpOnly: true })
      .json({ message: "Successfully registered!" });
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

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token").send("Successfully logged out");
  } catch (error) {
    next(error);
  }
};
