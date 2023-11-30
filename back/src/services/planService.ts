import { prisma } from "../database/database";
import { CustomError } from "../utils/customError";
import { Plan } from "../utils/types";

export const addPlan = async (planData: Plan) => {
  try {
    const plan = await prisma.plan.create({ data: { ...planData } });

    return plan;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to create plan!", 400);
  }
};

export const getPlans = async () => {
  try {
    const plans = await prisma.plan.findMany();
    return plans;
  } catch (error) {
    throw new CustomError("Unable to get plans!", 500);
  }
};

export const deletePlan = async (id: string) => {
  try {
    await prisma.plan.delete({ where: { id } });
  } catch (error) {
    throw new CustomError("Unable to delete plan!", 500);
  }
};
export const getPlan = async (planId: string) => {
  try {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    return plan;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to get Plan!", 400);
  }
};
