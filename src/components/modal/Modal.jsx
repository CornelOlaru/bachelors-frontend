import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./modal.css";

//Modal component reused for multiple modal types such as cart, login, register etc.
const Modal = ({ onRequestClose, children, isOpen, size = "50" }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    };
  }, [isOpen]);

  return isOpen ? (
    <div className="modal-container" onClick={onRequestClose}>
      <div
        className={`modal-content modal-base modal-${size}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-body">
          <button className="modal-close-button" onClick={onRequestClose}>
            <IoClose color="#000" />
          </button>
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

//Sub-components from the parent component - Modal that allows structuring its code and styles reused across the project
Modal.Title = ({ children }) => <div className="modal-title">{children}</div>;
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

export default Modal;
