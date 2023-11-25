import { NextFunction, Request, Response } from "express";
import {
  addPlan,
  deletePlan,
  getPlans,
  purchasePlan,
} from "../services/planService";
import { UserAuthInfoRequest } from "../utils/requestTypes";

export const addPlanControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plan = await addPlan(req.body);

    const { id, ...planData } = plan;

    res.status(201).send(planData);
  } catch (error) {
    next(error);
  }
};
export const getPlansControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plans = await getPlans();

    res.send(plans);
  } catch (error) {
    next(error);
  }
};

export const deletePlanControl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePlan(req.params.id);
    res.send("Successfully deleted plan!");
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
