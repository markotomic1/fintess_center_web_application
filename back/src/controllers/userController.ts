import { UserAuthInfoRequest } from "../utils/requestTypes";
import {
  getUserById,
  login,
  register,
  changeUserPassword,
  updateUser,
  getLoggedInUserPlan,
  purchasePlan,
  storeImageUrl,
  getAllUsers,
  deleteUser,
  changeUserRole,
} from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

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
export const getLoggedInUser = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.planId) {
      return res.send(req.user);
    }
    const plan = await getLoggedInUserPlan(req.user?.planId);

    if (!plan) throw new CustomError("Plan not found!", 400);

    const { id, ...planData } = plan;
    res.send({ ...req.user, ...planData });
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

//update user controller

export const updateUserControl = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const { updatedUser, token } = await updateUser(
      user,
      req.user?.username,
      req.user?.email
    );

    res
      .cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 30 * 3 })
      .send(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const purchasePlanControl = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { plan } = req.body;
    await purchasePlan(
      req.user?.username!,
      plan.id,
      plan.startDate,
      plan.endDate
    );
    res.send("Successfully purchaes a plan!");
  } catch (error) {
    next(error);
  }
};
export const storeImgUrlControl = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await storeImageUrl(req.user?.username!, req.body.imgUrl);
    res.send("Image url successfully stored!");
  } catch (error) {
    next(error);
  }
};

export const getAllUsersControl = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
};
export const deleteUserControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.username) {
      throw new CustomError("Unable to delete user!", 400);
    }
    await deleteUser(req.params.username);
    res.send("Succesfully deleted");
  } catch (error) {
    next(error);
  }
};
export const changeUserRoleControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.newRole !== "USER" && req.body.newRole !== "TRAINER") {
      throw new CustomError("Forbidden role!", 403);
    }
    await changeUserRole(req.body.username, req.body.newRole);
    res.send("Role changed!");
  } catch (error) {
    next(error);
  }
};
