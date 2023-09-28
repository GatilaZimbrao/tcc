import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/auth/context/AuthContext";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, initialValidate: authInitialValidate } = useAuth();

  // const shouldRedirectToLogin =
  //   !isAuthenticated && authInitialValidate && location.pathname !== "/login";

  console.log("isAuthenticated", isAuthenticated);
  console.log("authInitialValidate", authInitialValidate);
  const shouldRedirectToLogin =
    !isAuthenticated && location.pathname !== "/login";

  if (shouldRedirectToLogin) {
    return <Navigate to={"/login"} replace />;
  }

  // if (!authInitialValidate) return <></>;

  return <Outlet />;
};
