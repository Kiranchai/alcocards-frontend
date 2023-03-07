import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import ReactDOM from "react-dom";
import { IModalProps } from "../../../interfaces/IModal";
import fetchHeaders from "../../../utils/Headers";
import { SERVER_DOMAIN } from "../../../utils/Variables";

const ResendPasswordModal = ({ open, onClose }: IModalProps) => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    setIsLoading(true);

    fetch(`${SERVER_DOMAIN}/api/auth/sendPasswordReset`, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({ email }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.type !== "error") {
          setEmail("");
          onClose();
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonDisabled(false);
        setIsLoading(false);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-layout"></div>
      <div className="modal">
        <h2 className="modal-header">Zmiana hasła</h2>
        <span className="modal-message">
          Podaj adres email swojego konta. Wyślemy link zmiany hasła
        </span>
        <form>
          <label
            htmlFor="email"
            style={{
              textShadow: "1px 1px 1px black",
              color: "rgb(232, 232, 232)",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />

          {error && <div className="error-container">{error}</div>}

          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <button
              className="submit-btn"
              type="submit"
              onClick={handleResetPassword}
              disabled={buttonDisabled}
            >
              {isLoading ? (
                <CircularProgress className="loading-anim" />
              ) : (
                "Wyślij"
              )}
            </button>
            <button className="submit-btn cancel" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default ResendPasswordModal;
