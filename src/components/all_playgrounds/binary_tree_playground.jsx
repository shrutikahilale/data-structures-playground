import "./css/binary_tree.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SubTree = ({
  node,
  parent = null,
  level = 0,
  isLeftChild = false,
  onNodeClick,
}) => {
  // Define styles dynamically based on the level
  const containerStyle =
    isLeftChild === true
      ? {
          marginRight: `${level * 1}rem`, // Adjust the margin-left based on the level
        }
      : {
          marginLeft: `${level * 1}rem`, // Adjust the margin-left based on the level
        };

  if (!node) return <div className="subtree-node null-node">NULL</div>; // Handle empty nodes

  return (
    <div className="subtree-container" style={containerStyle}>
      <div className="node-with-arrows">
        <div
          className="subtree-node non-null-node"
          onClick={() => onNodeClick(node, parent, isLeftChild)}
        >
          {node.value}
        </div>
        <div className="binary-tree-arrows">
          <FontAwesomeIcon
            className="binary-tree-arrows-section left-arrow"
            icon={faArrowRight}
          />
          <FontAwesomeIcon
            className="binary-tree-arrows-section right-arrow"
            icon={faArrowRight}
          />
        </div>
      </div>
      <div className="subtree-children">
        <div className="subtree-child">
          <SubTree
            node={node.left}
            parent={node}
            level={level + 1}
            isLeftChild={true}
            onNodeClick={onNodeClick}
          />
        </div>
        <div className="subtree-child">
          <SubTree
            node={node.right}
            parent={node}
            level={level + 1}
            isLeftChild={false}
            onNodeClick={onNodeClick}
          />
        </div>
      </div>
    </div>
  );
};

const BinaryTreeVisualizer = ({ root, onNodeClick }) => {
  return (
    <div className="binary-tree-container">
      <SubTree node={root} onNodeClick={onNodeClick} />
    </div>
  );
};

const BinaryTreePlayground = () => {
  // Example binary tree
  const [root, setRoot] = useState({
    value: 100,
    left: {
      value: 10,
      left: null,
      right: null,
    },
    right: {
      value: 200,
      left: {
        value: 150,
        left: null,
        right: null,
      },
      right: null,
    },
  });

  const handleNodeClick = (node, parent, isLeftChild) => {
    const action = prompt(
      `Selected Node: ${node.value}\nChoose an action: \n1. Add Left Node \n2. Add Right Node \n3. Update Value \n4. Delete Node`
    );

    if (action === "1") {
      const newValue = parseInt(
        prompt("Enter value for the new left node:"),
        10
      );

      // Ensure the new node value is less than the current node's value
      /* when we want to add a new node, things to be taken care of:
      1. check input value is less than parent when adding left child 
      2. check input value is more than parent when adding right child 
      3. when left child value is less than parent it should also be more than its' parent's parent value, if the parent is the right child in its subtree
      4. when right child value is more than parent it should also be less than its' parent's parent value, if the parent is the left child in its subtree */
      if (newValue < node.value) {
        if (!node.left) {
          if (
            !parent || // When parent is null (root node scenario)
            (isLeftChild && newValue > parent.value) || // Condition 3: Left child in right subtree
            !isLeftChild // Default condition
          ) {
            node.left = { value: newValue, left: null, right: null };
            setRoot({ ...root }); // Trigger re-render
          } else {
            alert(
              `Violating the property of Binary Tree: When left child value is less than parent it should also be more than its' parent's parent value, if the parent is the right child in its subtree.`
            );
          }
        } else {
          alert("Left child already exists!");
        }
      } else {
        alert("Value must be less than the parent node's value.");
      }
    } else if (action === "2") {
      const newValue = parseInt(
        prompt("Enter value for the new right node:"),
        10
      );

      // Ensure the new node value is greater than the current node's value
      if (newValue > node.value) {
        if (!node.right) {
          if (
            !parent || // When parent is null (root node scenario)
            (!isLeftChild && newValue < parent.value) || // Condition 4: Right child in left subtree
            isLeftChild // Default condition
          ) {
            node.right = { value: newValue, left: null, right: null };
            setRoot({ ...root }); // Trigger re-render
          } else {
            alert(
              `Violating the property of Binary Tree: When right child value is more than parent it should also be less than its' parent's parent value, if the parent is the left child in its subtree.`
            );
          }
        } else {
          alert("Right child already exists!");
        }
      } else {
        alert("Value must be greater than the parent node's value.");
      }
    } else if (action === "3") {
      const newValue = parseInt(prompt("Enter new value for this node:"), 10);

      // Ensure new value maintains the binary tree property with respect to its children
      if (
        (!node.left || newValue > node.left.value) &&
        (!node.right || newValue < node.right.value)
      ) {
        node.value = newValue;
        setRoot({ ...root }); // Trigger re-render
      } else {
        alert(
          "New value must be greater than left child and less than right child."
        );
      }
    } else if (action === "4") {
      const confirmation = window.confirm(
        "Are you sure you want to delete this node?"
      );
      if (confirmation) {
        if (parent) {
          if (isLeftChild) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else {
          setRoot(null); // If it's the root node being deleted
        }
        setRoot({ ...root }); // Trigger re-render
      }
    }
  };

  return (
    <div>
      <h1>Binary Tree Playground</h1>
      <BinaryTreeVisualizer root={root} onNodeClick={handleNodeClick} />
    </div>
  );
};

export default BinaryTreePlayground;
