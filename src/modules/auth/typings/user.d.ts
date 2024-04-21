import { Role } from "./roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
