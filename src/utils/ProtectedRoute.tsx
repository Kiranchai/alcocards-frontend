import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const user = currentUser?.currentUser;

  return (
    <>
      {currentUser?.pending ? (
        <section className="mh" style={{ background: "var(--bg-color)" }}>
          <CircularProgress />
        </section>
      ) : (
        <>{user?.isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
};

export default ProtectedRoute;
