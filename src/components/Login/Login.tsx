import { useAuth } from "../../contexts/AuthContext";
import { Navigate, NavLink } from "react-router-dom";
import { SERVER_DOMAIN } from "../../utils/Variables";
import fetchHeaders from "../../utils/Headers";
import { useState } from "react";
import ResendTokenModal from "../Modals/ResendTokenModal/ResendTokenModal";
import "./Login.css";

const Login = () => {
  const currentUser = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalShown, setModalShown] = useState(false);

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
        setButtonDisabled(false);
      });
  };

  const handleModalDisplay = () => {
    setModalShown(true);
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
                message={"Podaj adres email swojego konta"}
              />

              <section className="mh login-section">
                <div className="login-form-wrapper">
                  <h2 className="login-header">Logowanie</h2>
                  {error && <div className="error-container">{error}</div>}

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
                    <label className="login-label">Hasło</label>
                    <input
                      type={"password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="form-input"
                      placeholder="********"
                    />
                    <NavLink
                      to={"/password-recovery"}
                      className="forgot-password"
                    >
                      Nie pamiętam hasła
                    </NavLink>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={buttonDisabled}
                      className="submit-btn"
                    >
                      Zaloguj
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
                    Zarejestruj się
                  </NavLink>
                </span>
                <span
                  style={{
                    textAlign: "center",
                  }}
                >
                  Twój link aktywacyjny wygasł?{" "}
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
