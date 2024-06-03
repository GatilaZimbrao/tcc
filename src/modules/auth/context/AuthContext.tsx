import Cookies from "js-cookie";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../../shared/clients/APIClient";

import { User } from "../typings/user";

import { AxiosError } from "axios";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  SessionResponse,
} from "../typings/auth";
import { SESSION_TOKEN } from "../../../shared/constants/cookies";
import { ROLES } from "../typings/roles";

const { ERR_BAD_REQUEST, ERR_NETWORK } = AxiosError;

export type RegisterResult = {
  success: boolean;
  message?: string;
  error?: typeof ERR_BAD_REQUEST | typeof ERR_NETWORK;
};

export type LoginResult = {
  success: boolean;
  message?: string;
  error?: typeof ERR_BAD_REQUEST | typeof ERR_NETWORK;
};

export interface AuthContext {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  user?: User;
  initialValidate: boolean;
  handleLogin: ({ email, password }: LoginInput) => Promise<LoginResult>;
  handleRegister: ({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterInput) => Promise<RegisterResult>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [initialValidate, setInitialValidate] = useState<boolean>(false);

  const validateSession = async () => {
    setLoading(true);
    try {
      const response = await api.get<SessionResponse>("/auth/session");
      const authenticated = response.status === 200;

      if (authenticated) {
        setUser(response.data);
      }
    } catch (_) {
    } finally {
      setLoading(false);
      setInitialValidate(true);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const handleLogin = async ({
    email,
    password,
  }: LoginInput): Promise<LoginResult> => {
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const authenticated = response.status === 200;

      if (authenticated) {
        setUser(response.data.user);

        Cookies.set(SESSION_TOKEN, "Bearer " + response.data.token);
      }

      return { success: authenticated };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === ERR_BAD_REQUEST) {
          return {
            success: false,
            error: ERR_BAD_REQUEST,
            message: error.response?.data?.message,
          };
        }
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({
    name,
    email,
    password,
    confirmPassword,
  }: RegisterInput): Promise<RegisterResult> => {
    setLoading(true);

    try {
      const response = await api.post<RegisterResponse>("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      const created = response.status === 201;

      return { success: created, message: "Cadastrado com sucesso!" };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === ERR_BAD_REQUEST) {
          return {
            success: false,
            error: ERR_BAD_REQUEST,
            message: error.response?.data?.message,
          };
        }

        if (error.code === ERR_NETWORK) {
          return { success: false, error: ERR_NETWORK };
        }
      }

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(undefined);

    Cookies.remove(SESSION_TOKEN);
  };

  const isAuthenticated = !!user && !loading;

  const isAdmin = !!user && !loading && user.role == ROLES.admin;

  const authContext = {
    isAuthenticated,
    isAdmin,
    loading,
    user,
    initialValidate,
    handleLogin,
    handleRegister,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be called within AuthContextProvider");
  return context;
};
