import ReactDOM from "react-dom";
import { IModalProps } from "../../interfaces/IModal";
import "./Modal.css";

const Modal = ({ message, open, onClose }: IModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-layout"></div>
      <div className="modal">
        {/* <h2>Powiadomienie</h2> */}
        <span className="modal-message">{message}</span>
        <button className="submit-btn" onClick={onClose}>
          Rozumiem
        </button>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
