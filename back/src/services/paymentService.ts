import { CustomError } from "../utils/customError";
import Stripe from "stripe";

export const payment = async (plan: {
  id: string;
  planName: string;
  planPrice: string;
  desc: string[];
}) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY!);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      metadata: { product_id: plan.id },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.planName,
              description: plan.desc.join(""),
            },
            unit_amount: 100 * Number(plan.planPrice),
          },
          quantity: 1,
        },
      ],
    });
    return session.url;
  } catch (error) {
    console.error(error);
    throw new CustomError("Unable to proccess payment", 500);
  }
};

export const verifySession = async (session_id: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY!);
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      throw new CustomError("Session not valid", 400);
    }
    if (!session.metadata) {
      throw new CustomError("An error occured", 500);
    }
    return session.metadata.product_id;
  } catch (error) {
    console.error(error);
    throw new CustomError("Session not valid!", 400);
  }
};
