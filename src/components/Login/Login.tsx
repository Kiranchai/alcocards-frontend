import { useAuth } from "../../contexts/AuthContext";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { SERVER_DOMAIN } from "../../utils/Variables";
import fetchHeaders from "../../utils/Headers";
import { useState } from "react";
import ResendTokenModal from "../Modals/ResendTokenModal/ResendTokenModal";
import "./Login.css";
import ResetPasswordModal from "../Modals/ResetPasswordModal/ResetPasswordModal";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [resetPasswordModalShown, setResetPasswordModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
        if (data.type === "error") {
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
        setIsLoading(false);
        setButtonDisabled(false);
      });
  };

  const handleModalDisplay = () => {
    setModalShown(true);
  };

  const handleResetPasswordModalDisplay = () => {
    setResetPasswordModalShown(true);
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
            <>
              <ResendTokenModal
                open={modalShown}
                onClose={() => {
                  setModalShown(false);
                }}
              />

              <ResetPasswordModal
                open={resetPasswordModalShown}
                onClose={() => {
                  setResetPasswordModalShown(false);
                }}
              />

              <section className="mh login-section">
                <div className="login-form-wrapper">
                  <h2 className="login-header">Logowanie</h2>
                  {error && <div className="error-container">{error}</div>}
                  {location.state && location.state.type === "error" && (
                    <div className="error-container">
                      {location.state.message}
                    </div>
                  )}
                  {location.state && location.state.type === "success" && (
                    <div className="success-container">
                      {location.state.message}
                    </div>
                  )}

                  <form className="login-form">
                    <label className="login-label">Email</label>
                    <input
                      type={"text"}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="form-input"
                      placeholder="xyz@domain.com"
                    />
                    <label className="login-label">Has??o</label>
                    <input
                      type={"password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="form-input"
                      placeholder="********"
                    />
                    <span
                      className="nav-link"
                      style={{
                        color: "var(--blueish)",
                        cursor: "pointer",
                        fontSize: ".95rem",
                        marginBottom: ".5rem",
                        textShadow: "1px 1px 2px black",
                      }}
                      onClick={handleResetPasswordModalDisplay}
                    >
                      Nie pami??tam has??a
                    </span>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={buttonDisabled}
                      className="submit-btn"
                    >
                      {isLoading ? (
                        <CircularProgress className="loading-anim" />
                      ) : (
                        "Zaloguj"
                      )}
                    </button>
                  </form>
                </div>
                <span
                  style={{
                    textAlign: "center",
                  }}
                >
                  Nie posiadasz konta?{" "}
                  <NavLink
                    style={{
                      color: "var(--blueish)",
                    }}
                    to={"/register"}
                  >
                    Zarejestruj si??
                  </NavLink>
                </span>
                <span
                  style={{
                    textAlign: "center",
                  }}
                >
                  Tw??j link aktywacyjny wygas???{" "}
                  <span
                    style={{
                      color: "var(--blueish)",
                      cursor: "pointer",
                    }}
                    onClick={handleModalDisplay}
                  >
                    Kliknij tutaj
                  </span>
                </span>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Login;
