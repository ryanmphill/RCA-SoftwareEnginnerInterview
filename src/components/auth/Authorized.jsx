import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { usePocketBase } from "../../context/usePocketBase";
import { SpinningCircles } from "react-loading-icons";
import { useEffect, useState } from "react";

/* 
  This component is a wrapper for routes that require authentication.
  It checks if the user has a valid token and redirects to the login page if not.
*/
export const Authorized = () => {
  const { token, pb, syncUserState } = usePocketBase();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  /* Ensure previously stored auth credentials are still valid and up to date */
  useEffect(() => {
    let ignore = false;
    async function authRefresh() {
      // Early exit if no auth credentials are stored (Redirect to login)
      if (!pb?.authStore?.token) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const authData = await pb.collection("users").authRefresh();
        return authData;
      } catch (error) {
        const isStrictModeAbort =
          import.meta.env.MODE === "development" && error?.isAbort;
        // 401 Unauthorized, redirect to login
        if (error?.response?.code === 401) {
          navigate("/login", { replace: true });
        } else if (isStrictModeAbort) {
          // Ignore abort errors in development strict mode
        } else {
          throw error;
        }
      } finally {
        if (!ignore) {
          setIsAuthenticating(false);
          syncUserState(pb.authStore);
        }
      }
    }
    authRefresh();
    return () => {
      ignore = true;
    };
  }, [pb, syncUserState, navigate]);

  if (isAuthenticating) {
    return (
      <div className="authenticating">
        <p>Authenticating...</p>
        <SpinningCircles speed={1.15} fill={"#a4b494"} />
      </div>
    );
  }
  if (token && !isAuthenticating) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
