import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, NavLink } from "react-router-dom";
import { SERVER_DOMAIN } from "../../utils/Variables";
import fetchHeaders from "../../utils/Headers";
import Modal from "../Modal/Modal";

const Register = () => {
  const currentUser = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setButtonDisabled(true);

    if (password !== confirmPassword) {
      return setError("Podane hasła się różnią");
    }

    const newUser = {
      email,
      password,
    };

    fetch(`${SERVER_DOMAIN}/api/auth/register`, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "error") {
          setError(data.message);
        } else {
          setModalMessage(data.message);
          setModalShown(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
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
            <section className="mh login-section">
              <Modal
                open={modalShown}
                onClose={() => {
                  setModalShown(false);
                }}
                message={modalMessage}
              />

              <div className="login-form-wrapper">
                <h2 className="login-header">Rejestracja</h2>
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
                  <label className="login-label">Powtórz hasło</label>
                  <input
                    type={"password"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="form-input"
                    placeholder="********"
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={buttonDisabled}
                    className="submit-btn"
                  >
                    Zarejestruj
                  </button>
                </form>
              </div>
              <span
                style={{
                  textAlign: "center",
                }}
              >
                Masz już konto?{" "}
                <NavLink
                  style={{
                    color: "var(--blueish)",
                  }}
                  to={"/login"}
                >
                  Zaloguj się
                </NavLink>
              </span>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Register;
