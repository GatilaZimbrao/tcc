import { User } from "./user";

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterResponse = User;

export type SessionResponse = User;
