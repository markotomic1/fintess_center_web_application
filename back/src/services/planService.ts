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
export const deletePLan = async (id: string) => {
  try {
    await prisma.plan.delete({ where: { id } });
  } catch (error) {
    throw new CustomError("Unable to delete plan!", 500);
  }
};
