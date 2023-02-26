import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({
  message,
  open,
  onClose,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-layout"></div>
      <div className="modal">{message}</div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
