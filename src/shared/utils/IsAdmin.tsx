import { useAuth } from "../../modules/auth/context/AuthContext";
import { ReactNode } from "react";

interface IsAdminProps {
  children: ReactNode;
}

const AdminOnly = ({ children }: IsAdminProps) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }
  return <>{children}</>;
};

export { AdminOnly };
