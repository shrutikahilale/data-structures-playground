import React, { useState, useRef } from "react";
import Modal from "./modal_";
import "./all_playgrounds/css/utility.css";

const NodeOperationModal = () => {
  const [hovered, setHovered] = useState(false);
  const [operation, setOperation] = useState(null);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const hoverRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverRef.current) {
      const rect = hoverRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY, // Position below the element
        left: rect.left + window.scrollX, // Align to the left
      });
    }
    setHovered(true);
  };

  const handleMouseLeave = () => setHovered(false);

  const handleOperationClick = (op) => {
    setOperation(op);
    setInputModalVisible(true);
    setHovered(false); // Close the operations modal
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (isInputValid()) {
      //   alert(
      //     `Operation "${operation}" with value "${inputValue}" was successful!`
      //   );
      setAlertMessage(
        `Operation "${operation}" with value "${inputValue}" was successful!`
      );
      setAlertModalVisible(true);
      setInputModalVisible(false);
      setInputValue("");
    } else {
      //   alert("Invalid input! Please try again.");
      setAlertMessage(`Invalid input! Please try again.`);
      setAlertModalVisible(true);
      setTimeout(() => {
        setAlertModalVisible(false);
      }, 3000);
    }
  };

  const isInputValid = () => {
    // Replace with actual validation logic
    return inputValue.trim() !== "";
  };

  return (
    <div style={{ position: "relative", padding: "50px" }}>
      <div
        className="hover-element"
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        ref={hoverRef}
      >
        Hover over me
      </div>

      <Modal
        isVisible={hovered}
        onClose={() => setHovered(false)}
        position={modalPosition}
      >
        <ul className="operation-list">
          <li onClick={() => handleOperationClick("Add left node")}>
            Add left node
          </li>
          <li onClick={() => handleOperationClick("Add right node")}>
            Add right node
          </li>
          <li onClick={() => handleOperationClick("Update node value")}>
            Update node value
          </li>
        </ul>
      </Modal>

      <Modal
        isVisible={inputModalVisible}
        onClose={() => setInputModalVisible(false)}
        position={{
          top: window.innerHeight / 2 - 100, // Center vertically
          left: window.innerWidth / 2 - 150, // Center horizontally
        }}
      >
        <h3>{operation}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Enter value for ${operation}`}
          className="custom-input"
        />
        <button onClick={handleSubmit}>Submit</button>
      </Modal>

      {alertModalVisible && <div className="alert-modal"> {alertMessage}</div>}
    </div>
  );
};

export default NodeOperationModal;
