import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const NodeActionModal = ({ isOpen, onClose, onSubmit, selectedNode }) => {
  const [action, setAction] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    onSubmit(action, selectedNode.parent, selectedNode.isLeftChild, inputValue);
    setAction("");
    setInputValue("");
  };

  console.log(
    selectedNode.node.value,
    selectedNode.parent.value,
    selectedNode.parent.parentVal
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Node Action">
      <h2>Node {selectedNode.node.value}</h2>
      <div>
        <label>Choose Action:</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Select...</option>
          {selectedNode.node.left === null && (
            <option value="addLeft">Add Left Node</option>
          )}
          <option value="addRight">Add Right Node</option>
          <option value="update">Update Value</option>
          <option value="delete">Delete Node</option>
        </select>
      </div>
      {(action === "addLeft" ||
        action === "addRight" ||
        action === "update") && (
        <div>
          <label>Enter Value:</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSubmit}
      >
        <button>Submit</button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
      >
        <button>Cancel</button>
      </motion.div>
    </Modal>
  );
};

export default NodeActionModal;
