import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  user?: {
    email: string;
    name: string;
    surname: string;
    username: string;
    role: "ADMIN" | "USER" | "TRAINER";
  };
}
