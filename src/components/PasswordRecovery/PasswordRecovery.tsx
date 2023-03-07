import React, { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";

const PasswordRecovery = () => {
  const { token } = useParams();
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<String>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");

    if (password !== confirmPassword) {
      setButtonDisabled(false);
      return setError("Podane hasła się różnią");
    } else {
      fetch(`${SERVER_DOMAIN}/api/auth/resetPassword`, {
        headers: fetchHeaders,
        method: "POST",
        body: JSON.stringify({
          newPassword: password,
          hash: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.type === "error") {
            setError(data.message);
          } else if (data.type === "success") {
            navigate("/login", {
              replace: true,
              state: { type: "success", message: data.message },
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setButtonDisabled(false);
        });
    }
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
              <div className="login-form-wrapper">
                <h2 className="login-header">Resetowanie hasła</h2>
                {error && <div className="error-container">{error}</div>}

                <form className="login-form">
                  <label className="login-label">Nowe hasło</label>
                  <input
                    type={"password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-input"
                    placeholder="********"
                  />
                  <label className="login-label">Powtórz nowe hasło</label>
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
                    Zmień hasło
                  </button>
                </form>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default PasswordRecovery;
