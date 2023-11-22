export type dayType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface UpdateUser {
  username: string;
  name: string;
  surname: string;
  email: string;
}
export interface Plan {
  planName: string;
  planPrice: string;
  planDescription: string[];
}
