import { CustomError } from "./customError";
import { sign, verify } from "jsonwebtoken";

export const generateToken = (username: string) => {
  const jwtSecret = process.env.JWT_TOKEN;
  if (!jwtSecret) throw new CustomError("Server error!", 500);

  const token = sign(username, jwtSecret);

  return token;
};

export const verifyToken = (token: string) => {
  const jwtSecret = process.env.JWT_TOKEN;
  if (!jwtSecret) throw new CustomError("Server error!", 500);

  return verify(token, jwtSecret)?.toString();
};
