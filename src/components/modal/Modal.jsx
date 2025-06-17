import React, { useEffect } from "react";

import "./modal.css";
import { IoClose } from "react-icons/io5";
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
        <button className="modal-close-button" onClick={onRequestClose}>
          <IoClose color="#000"/>
        </button>
        <div className="modal-body">

        {children}
        </div>
      </div>
    </div>
  ) : null;
};

Modal.Title = ({ children }) => <div className="modal-title">{children}</div>;
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

export default Modal;
