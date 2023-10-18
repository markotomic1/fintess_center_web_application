export interface User {
  username: string;
  password: string;
  email?: string;
  name?: string;
  surname?: string;
}
export interface UserState {
  username: string;
  email: string;
  name: string;
  surname: string;
  role: "ADMIN" | "TRAINER" | "USER" | "";
}
export interface UserRegister {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}
export interface UserLogin {
  username: string;
  password: string;
}
export interface ContactData {
  fullname: string;
  email: string;
  phone: string;
  description: string;
}
