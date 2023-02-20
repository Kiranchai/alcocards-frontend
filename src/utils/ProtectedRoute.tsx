import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const user = currentUser?.currentUser;

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>{user?.isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
};

export default ProtectedRoute;
