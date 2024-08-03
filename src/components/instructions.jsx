import "../dataStructures.css"; // Make sure to create this CSS file for styling
import Playground from "./playground";
import React, { useState } from "react";

const instrData = {
  array: [
    "Select the data type for your array (e.g., Integer, Float, String).",
    "Use the provided input field to add elements to the array.",
    "Visualize operations like insertion, deletion, and searching directly in the array.",
  ],
  stack: [
    "Choose the data type for the stack elements.",
    'Add elements using the "Push" button and remove them with the "Pop" button.',
    "Observe the stack’s behavior as elements are added or removed.",
  ],
  queue: [
    "Select the data type for the queue elements.",
    'Add elements using the "Enqueue" button and remove them with the "Dequeue" button.',
    "Watch the queue update as elements are processed from front to back.",
  ],
  linkedList: [
    "Choose the data type for the linked list nodes.",
    'Add nodes using the "Add Node" button and remove them with the "Remove Node" button.',
    "Visualize the linked list structure and how nodes are connected.",
  ],
  binaryTree: [
    "Select the data type for the tree nodes.",
    'Insert nodes to build the tree structure using the "Insert Node" button.',
    "Traverse the tree and see how nodes are connected through different traversal methods (in-order, pre-order, post-order).",
  ],
};

function InstructionsComponent({ ds, setShowHomepage, setSelectedDs }) {
  const [showPlayground, setShowPlayground] = useState(false);
  const dsVal = ds.charAt(0).toUpperCase() + ds.slice(1);

  return instrData.hasOwnProperty(ds) ? (
    <div className="data-structure-details">
      <h2>{dsVal}</h2>
      <ul>
        {instrData[ds].map((instruction, index) => (
          <li key={index}>
            <span>{index + 1}.</span> <span>{instruction}</span>
          </li>
        ))}
      </ul>

      <button onClick={() => setShowPlayground(true)}>Go to playground</button>

      <button
        onClick={() => {
          setShowHomepage(true);
          setSelectedDs("");
        }}
      >
        Back to List
      </button>

      {showPlayground ? <Playground /> : null}
    </div>
  ) : null;
}

export default InstructionsComponent;
