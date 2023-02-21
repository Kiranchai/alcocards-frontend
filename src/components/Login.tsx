import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { SERVER_DOMAIN } from "../utils/Variables";
import fetchHeaders from "../utils/Headers";
import { useState } from "react";

const Login = () => {
  const currentUser = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    const credentials = {
      email,
      password,
    };

    fetch(`${SERVER_DOMAIN}/api/auth/login`, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message && data.message !== "Success") {
          setError(data.message);
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonDisabled(false);
      });
  };

  return (
    <>
      {currentUser?.pending ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentUser?.currentUser?.isLoggedIn ? (
            <Navigate to={"/"} />
          ) : (
            <div>
              <p>{error}</p>
              <form>
                <label>Email</label>
                <input
                  type={"text"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label>Hasło</label>
                <input
                  type={"password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={buttonDisabled}
                >
                  Zaloguj
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
