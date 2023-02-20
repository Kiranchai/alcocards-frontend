import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const currentUser = useAuth();

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentUser?.currentUser?.isLoggedIn ? (
            <Navigate to={"/"} />
          ) : (
            <div>Login</div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
