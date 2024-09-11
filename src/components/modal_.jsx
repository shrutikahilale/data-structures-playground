import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";

const Modal = ({ isVisible, onClose, children, position }) => {
  return (
    isVisible && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-close-btn" onClick={onClose}>
            ✖
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
