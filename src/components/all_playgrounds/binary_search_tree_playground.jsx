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

  // error
  const [error, setError] = useState("");

  // valid position
  const getValidPosition = (node, newValue) => {
    if (node === null) {
      return null;
    }

    // Check if the left child is null and this is the correct position
    if (newValue < node.value) {
      if (node.left === null) {
        return node; // Found a valid position
      } else {
        return getValidPosition(node.left, newValue);
      }
    }

    // Check if the right child is null and this is the correct position
    if (newValue > node.value) {
      if (node.right === null) {
        return node; // Found a valid position
      } else {
        return getValidPosition(node.right, newValue);
      }
    }

    return null; // New value is equal to current node's value, which is not allowed
  };

  const findValidPosition = (node, newValue, isAddLeftNode) => {
    const validPosition = getValidPosition(root, newValue);

    console.log(
      "valid position found: " +
        (validPosition != null ? validPosition.value : "not found")
    );

    if (validPosition) {
      // Check if the valid position found is the node clicked on
      const isValidInsertion = validPosition === node;

      if (isValidInsertion) {
        // Perform the insertion
        const insertNode = (parentNode, newValue) => {
          if (isAddLeftNode && newValue < parentNode.value) {
            console.log("valid case 1");
            parentNode.left = { value: newValue, left: null, right: null };
          } else if (!isAddLeftNode && newValue > parentNode.value) {
            parentNode.right = { value: newValue, left: null, right: null };
            console.log("valid case 2");
          } else {
            console.log("invalid case");
            setError("Invalid insertion position.");
            return;
          }
        };

        setRoot((prevRoot) => {
          // Insert node at the valid position
          insertNode(validPosition, newValue);
          return { ...prevRoot }; // Update the state
        });

        setError(""); // Clear any previous errors
      } else {
        setError("Invalid insertion position.");
      }
    } else {
      setError("No valid position found for the new node.");
    }
  };

  const deleteNodeFromTree = (tree, targetValue) => {
    // Function to delete the node from the copied tree
    if (!tree) return null;

    if (targetValue < tree.value) {
      tree.left = deleteNodeFromTree(tree.left, targetValue);
    } else if (targetValue > tree.value) {
      tree.right = deleteNodeFromTree(tree.right, targetValue);
    } else {
      if (!tree.left) return tree.right;
      if (!tree.right) return tree.left;

      let minValueNode = tree.right;
      while (minValueNode.left) {
        minValueNode = minValueNode.left;
      }
      tree.value = minValueNode.value;
      tree.right = deleteNodeFromTree(tree.right, minValueNode.value);
    }

    return tree;
  };

  const handleNodeClick = (node, parent, isLeftChild) => {
    const operation = parseInt(
      prompt(
        "Enter operation: \n1. Add left node \n2. Add right node \n3. Update value of the node \n4. Delete the node"
      )
    );

    var inputVal;

    console.log(`Operation selected: ${operation}`);

    if (!isNaN(operation)) {
      switch (operation) {
        case 1:
          // Add left node logic
          inputVal = parseInt(prompt("Enter value for the left node: "), 10);
          if (isNaN(inputVal)) {
            alert("Please enter a valid number.");
            return;
          }
          findValidPosition(node, inputVal, true);
          break;

        case 2:
          // Add right node logic
          inputVal = parseInt(prompt("Enter value for the right node: "), 10);
          if (isNaN(inputVal)) {
            alert("Please enter a valid number.");
            return;
          }
          findValidPosition(node, inputVal, false);
          break;

        case 3:
          // Update node value logic
          inputVal = parseInt(prompt("Enter new value for the node: "), 10);
          if (isNaN(inputVal)) {
            alert("Please enter a valid number.");
            return;
          }
          updateNodeValue(node, parent, inputVal);
          break;

        case 4:
          // Delete node logic
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
          console.log("after deleting : " + root);
          break;
        default:
          alert(`Invalid operation selected: ${operation}`);
          return;
      }
    } else {
      alert("Invalid operation selected");
    }
  };

  const updateNodeValue = (node, parent, newValue) => {
    setError(""); // reset error

    // Create a copy of the current tree structure without the current node
    const treeWithoutCurrentNode = JSON.parse(JSON.stringify(root)); // Copy the tree

    const deleteNodeFromTree = (tree, targetValue) => {
      // Function to delete the node and its subtree from the copied tree
      if (!tree) return null;

      if (targetValue < tree.value) {
        tree.left = deleteNodeFromTree(tree.left, targetValue);
      } else if (targetValue > tree.value) {
        tree.right = deleteNodeFromTree(tree.right, targetValue);
      } else {
        // Node to be deleted found; set it to null, effectively deleting it with its subtree
        return null;
      }

      return tree;
    };

    // Remove the current node from the copied tree
    const updatedTree = deleteNodeFromTree(treeWithoutCurrentNode, node.value);

    console.log("tree : \n", updatedTree);
    console.log("og tree : \n", root);

    // Now, try to insert the new value into the copied tree
    const isValidBSTInsertion = getValidPosition(updatedTree, newValue);

    console.log(isValidBSTInsertion);
    if (
      (isValidBSTInsertion && isValidBSTInsertion.value === parent.value) ||
      (node.right && newValue < node.right)
    ) {
      if (
        parent.left &&
        parent.left.value === node.value &&
        newValue < parent.value
      ) {
        if (node.left && node.left < newValue) {
          if (node.right && node.right > newValue) {
            console.log("abhi correct position milaa");
            // If the new value maintains the BST properties, update the original node
            node.value = newValue;
            setRoot({ ...root }); // Update the state
            setError(""); // Clear any previous errors
            return;
          }
        }
      }

      if (
        parent.right &&
        parent.right.value === node.value &&
        newValue > parent.value
      ) {
        if (node.left && node.left < newValue) {
          if (node.right && node.right > newValue) {
            console.log("abhi correct position milaa");
            // If the new value maintains the BST properties, update the original node
            node.value = newValue;
            setRoot({ ...root }); // Update the state
            setError(""); // Clear any previous errors
            return;
          }
        }
      }
    }

    console.log("abeyyy kaha ghusa raha hai node ko??");
    setError(
      "Invalid value for updating the node. It violates the BST property."
    );
    return;
  };

  return (
    <div>
      <h1>Binary Tree Playground</h1>
      <BinaryTreeVisualizer root={root} onNodeClick={handleNodeClick} />
      {error}
    </div>
  );
};

export default BinaryTreePlayground;
