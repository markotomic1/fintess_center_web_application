import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { verifyToken } from "../utils/jwtUtils";
import { prisma } from "../database/database";
import { UserAuthInfoRequest } from "../utils/requestTypes";

export const auth = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //    const token = req.headers.authorization?.split(" ")[1]; implement later

    const token = req.headers.cookie?.split("=")[1];

    if (!token) throw new CustomError("Not authorized", 401);

    const username = verifyToken(token);

    if (!username) throw new CustomError("Token is not valid!", 403);

    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) throw new CustomError("User not found!", 404);

    const { id, password, ...userData } = user;

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "ADMIN")
      throw new CustomError("Access Denied!", 403);

    next();
  } catch (error) {
    next(error);
  }
};
