import { CircularProgress } from "@mui/material";
import { useState } from "react";
import ReactDOM from "react-dom";
import { IModalProps } from "../../../interfaces/IModal";
import fetchHeaders from "../../../utils/Headers";
import { SERVER_DOMAIN } from "../../../utils/Variables";

const Modal = ({ open, onClose }: IModalProps) => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleResendLink = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    setIsLoading(true);

    fetch(`${SERVER_DOMAIN}/api/auth/resendLink`, {
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
        setIsLoading(false);
        setButtonDisabled(false);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-layout"></div>
      <div className="modal">
        <h2 className="modal-header">Link aktywacyjny</h2>
        <span className="modal-message">
          Podaj adres email swojego konta. Ponownie wyślemy link do weryfikacji.
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
              onClick={handleResendLink}
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

export default Modal;
