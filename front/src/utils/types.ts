export interface User {
  username: string;
  password: string;
  email?: string;
  name?: string;
  surname?: string;
}

export type PlanName =
  | "Basic_Plan"
  | "Premium_Plan"
  | "VIP_Plan"
  | "Group_Classes_Plan"
  | "No_Plan";

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  email: string;
  name: string;
  surname: string;
  role: "ADMIN" | "TRAINER" | "USER" | "";
  planName: PlanName;
  startDate: string;
  endDate: string;
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
export type dayType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | "";

export interface Training {
  id: string;
  trainingName: string;
  trainingTime: string;
  trainingDay: dayType;
}

export interface TrainingState {
  trainings: Training[];
}
export interface News {
  id: string;
  newsDescription: string;
}
export interface NewsState {
  news: News[];
}
export interface ModalState {
  modalType:
    | "addTraining"
    | "addNews"
    | "changePassword"
    | "editUser"
    | "planModal"
    | "choosePlan"
    | "closed";
}

export interface UpdateUser {
  username: string;
  name: string;
  surname: string;
  email: string;
}
