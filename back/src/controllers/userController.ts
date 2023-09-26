import { getUserById } from "../services/userService";
import { NextFunction, Request, Response } from "express";

export const loginUser = (req: Request, res: Response) => {};

export const registerUser = (req: Request, res: Response) => {};
export const changePassword = (req: Request, res: Response) => {};
export const getLoggedInUser = (req: Request, res: Response) => {};
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).send("User not found!");
    res.json(user);
  } catch (error) {
    next(error);
  }
};
