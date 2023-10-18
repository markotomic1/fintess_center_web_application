import nodemailer from "nodemailer";
import { CustomError } from "../utils/customError";
import validator from "validator";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: process.env.GMAIL_MAIL, pass: process.env.GMAIL_PASS },
});
export const send = async (
  senderEmail: string,
  fullname: string,
  phone: string,
  description: string
) => {
  try {
    if (!validator.isEmail(senderEmail))
      throw new CustomError("Mail not valid", 400);
    const info = await transporter.sendMail({
      from: senderEmail,
      to: "tomic4385@gmail.com",
      subject: `Message from ${senderEmail}`,
      text: `${fullname}\n${phone}\n\n${description}`,
    });
  } catch (error) {
    throw new CustomError("Sending email failed!", 400);
  }
};
