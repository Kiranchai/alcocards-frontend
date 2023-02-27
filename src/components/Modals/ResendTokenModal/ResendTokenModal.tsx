import { useState } from "react";
import ReactDOM from "react-dom";
import fetchHeaders from "../../../utils/Headers";
import { SERVER_DOMAIN } from "../../../utils/Variables";

const Modal = ({
  message,
  open,
  onClose,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleResendLink = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
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
        setButtonDisabled(false);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-layout"></div>
      <div className="modal">
        <span className="modal-message">{message}</span>
        <form>
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
              Wyślij
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
