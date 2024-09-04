import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";

const Modal = ({ isVisible, onClose, children, position }) => {
  const modalRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible && position) {
      const { innerWidth, innerHeight } = window;
      const modal = modalRef.current;
      if (modal) {
        const { offsetWidth, offsetHeight } = modal;
        let { top, left } = position;

        // Adjust if overflowing right
        if (left + offsetWidth > innerWidth) {
          left = innerWidth - offsetWidth - 10; // 10px padding
        }

        // Adjust if overflowing bottom
        if (top + offsetHeight > innerHeight) {
          top = innerHeight - offsetHeight - 10; // 10px padding
        }

        // Adjust if overflowing left
        if (left < 0) left = 10; // 10px padding

        // Adjust if overflowing top
        if (top < 0) top = 10; // 10px padding

        setAdjustedPosition({ top, left });
      }
    }
  }, [isVisible, position]);

  return (
    isVisible && (
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-content"
          style={{ top: adjustedPosition.top, left: adjustedPosition.left }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          ref={modalRef}
        >
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
