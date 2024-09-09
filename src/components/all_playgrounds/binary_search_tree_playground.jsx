import "./css/binary_tree.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal_.jsx";
import "../Modal.css";

const SubTree = ({
  node,
  parent = null,
  level = 0,
  isLeftChild = false,
  onNodeClick,
  onNodeHover,
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
          onMouseEnter={() => onNodeHover(node, parent, isLeftChild)}
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
            onNodeHover={onNodeHover}
          />
        </div>
        <div className="subtree-child">
          <SubTree
            node={node.right}
            parent={node}
            level={level + 1}
            isLeftChild={false}
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        </div>
      </div>
    </div>
  );
};

const BinaryTreeVisualizer = ({ root, onNodeClick, onNodeHover }) => {
  return (
    <div className="binary-tree-container">
      <SubTree
        node={root}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
      />
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
  const [alertMessage, setAlertMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [operation, setOperation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nodeData, setNodeData] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [operationString, setOperationString] = useState("Add left node");

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
    setAlertVisible(false);
    setAlertMessage("");

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
            setAlertMessage("Invalid insertion position.");
            setAlertVisible(true);
            setTimeout(() => {
              setAlertVisible(false);
            }, 3000);
            return;
          }
        };

        setRoot((prevRoot) => {
          // Insert node at the valid position
          insertNode(validPosition, newValue);
          return { ...prevRoot }; // Update the state
        });
      } else {
        setAlertMessage("Invalid insertion position.");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      }
    } else {
      setAlertMessage("No valid position found for the new node.");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
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
    setAlertMessage(""); // reset error

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

    // console.log("tree : \n", updatedTree);
    // console.log("og tree : \n", root);

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
            // console.log("abhi correct position milaa");
            // If the new value maintains the BST properties, update the original node
            node.value = newValue;
            setRoot({ ...root }); // Update the state
            setAlertVisible(false);
            setAlertMessage(""); // Clear any previous errors
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
            // console.log("abhi correct position milaa");
            // If the new value maintains the BST properties, update the original node
            node.value = newValue;
            setRoot({ ...root }); // Update the state
            setAlertVisible(false);
            setAlertMessage(""); // Clear any previous errors
            return;
          }
        }
      }
    }

    // console.log("abeyyy kaha ghusa raha hai node ko??");
    setAlertMessage(
      "Invalid value for updating the node. It violates the BST property."
    );
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);

    return;
  };

  const handleNodeHover = (node, parent, isLeftChild) => {
    setModalVisible(true);
    setNodeData({ node: node, parent: parent, isLeftChild: isLeftChild });

    if (operation == 4) {
      performOperation();
    }
  };

  const performOperation = () => {
    if (isNaN(inputValue)) {
      setAlertMessage("Please enter valid input");
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } else {
      console.log(`Operation selected: ${operation}`);

      switch (operation) {
        case 1:
          // Add left node logic
          findValidPosition(nodeData["node"], inputValue, true);
          break;

        case 2:
          // Add right node logic
          findValidPosition(nodeData["node"], inputValue, false);
          break;

        case 3:
          // Update node value logic
          updateNodeValue(nodeData["node"], nodeData["parent"], inputValue);
          break;

        case 4:
          if (nodeData["parent"]) {
            if (nodeData["isLeftChild"]) {
              nodeData["parent"].left = null;
            } else {
              nodeData["parent"].right = null;
            }
          } else {
            setRoot(null); // If it's the root node being deleted
          }
          setRoot({ ...root }); // Trigger re-render
          break;
        default:
          break;
      }
    }

    // reset
    setInputValue("");
    setOperation("");
    setOperationString("");
    setAlertMessage("");
    setAlertVisible(false);
    setModalVisible(false);
    setInputModalVisible(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getOperation = (operation) => {
    switch (operation) {
      case "1":
        return "Add node";
      case "2":
        return "Add right node";
      case "3":
        return "Update node";
      case "4":
        return "Delete node";
    }
  };

  return (
    <div>
      <h1>Binary Tree Playground</h1>
      <BinaryTreeVisualizer
        root={root}
        onNodeClick={() => {}}
        onNodeHover={handleNodeHover}
      />
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        // position={modalPosition}
      >
        {nodeData && <div>Node selected {nodeData["node"].value}</div>}
        <ul className="operation-list">
          <li
            onClick={() => {
              setOperation(1);
              setOperationString("Add left node");
              setInputModalVisible(true);
              setModalVisible(false);
            }}
          >
            Add left node
          </li>
          <li
            onClick={() => {
              setOperation(2);
              setOperationString("Add right node");
              setInputModalVisible(true);
              setModalVisible(false);
            }}
          >
            Add right node
          </li>
          <li
            onClick={() => {
              setOperation(3);
              setOperationString("Update node value");
              setInputModalVisible(true);
              setModalVisible(false);
            }}
          >
            Update node value
          </li>
          <li
            onClick={() => {
              setOperation(4);
              setOperationString("Delete node");
              setInputModalVisible(true);
              setModalVisible(false);
            }}
          >
            Delete node
          </li>
        </ul>
      </Modal>
      <Modal
        isVisible={inputModalVisible && !alertVisible && operation != 4}
        onClose={() => setInputModalVisible(false)}
        position={{
          top: window.innerHeight / 2 - 100, // Center vertically
          left: window.innerWidth / 2 - 150, // Center horizontally
        }}
      >
        <h3>{operationString}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Enter value`}
          className="custom-input"
        />
        <button onClick={() => performOperation()}>Submit</button>
      </Modal>

      {alertMessage && <div className="alert-modal"> {alertMessage}</div>}
    </div>
  );
};

export default BinaryTreePlayground;
