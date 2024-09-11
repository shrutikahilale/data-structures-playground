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
  const [nodeData, setNodeData] = useState(null);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [operation, setOperation] = useState("");
  const [operationString, setOperationString] = useState("Add left node");
  const [inputValue, setInputValue] = useState("");
  const [{ alertMessage, typeMessage }, setAlertMessage] = useState({
    alertMessage: "",
    typeMessage: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

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
    setAlertMessage({ alertMessage: "", typeMessage: "" });

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
            setAlertMessage("Invalid insertion position", "warning");
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
        setAlertMessage("Invalid insertion position", "warning");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      }
    } else {
      setAlertMessage("No valid position found for the new node", "warning");
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

  const findNodeToBeUpdated = (rootNode, value) => {
    if (rootNode == null) return null;

    if (rootNode.value === value) {
      return rootNode;
    }

    if (rootNode.value > value) {
      return findNodeToBeUpdated(rootNode.left, value);
    }
    return findNodeToBeUpdated(rootNode.right, value);
  };

  const isValidBST = (node, min = null, max = null) => {
    // An empty node is considered valid
    if (node === null) {
      return true;
    }

    // If the node's value violates the min/max constraint, it's not a valid BST
    if (
      (min !== null && node.value <= min) ||
      (max !== null && node.value >= max)
    ) {
      return false;
    }

    // Recursively check the left and right subtrees with updated constraints
    return (
      isValidBST(node.left, min, node.value) &&
      isValidBST(node.right, node.value, max)
    );
  };

  const updateNodeValueV2 = (node, newValue) => {
    // Reset errors
    setAlertMessage({ alertMessage: "", typeMessage: "" });
    setAlertVisible(false);

    // Copy the tree
    const copiedTree = JSON.parse(JSON.stringify(root));

    // find the node to be updated and update the value in the copiedTree
    var nodeToBeUpdated = findNodeToBeUpdated(copiedTree, node.value); // console.log("nodeToBeUpdated ", nodeToBeUpdated.value);
    nodeToBeUpdated.value = newValue; // console.log("nodeToBeUpdated ", nodeToBeUpdated.value);

    // check if the copiedTree is valid BST
    const res = isValidBST(copiedTree);

    if (res) {
      // if yes then update the original tree
      node.value = newValue;
      setRoot({ ...root });
      console.log("valid BST");
      setAlertMessage({ alertMessage: "Node Updated", typeMessage: "success" });
      setAlertVisible(true);
    } else {
      // else show error
      console.log("invalid BST");
      setAlertMessage({
        alertMessage: "Invalid updation",
        typeMessage: "warning",
      });
      setAlertVisible(true);
    }
  };

  const handleNodeClick = (node, parent, isLeftChild) => {
    setModalVisible(true);
    setNodeData({ node: node, parent: parent, isLeftChild: isLeftChild });

    if (operation == 4) {
      performOperation();
    }
  };

  const performOperation = () => {
    if (operation != "" && isNaN(inputValue)) {
      setAlertMessage({
        alertMessage: "Please enter valid input",
        typeMessage: "warning",
      });

      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } else {
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
          updateNodeValueV2(nodeData["node"], inputValue);
          break;

        default:
          // delete node
          if (nodeData["parent"]) {
            if (nodeData["isLeftChild"]) {
              nodeData["parent"].left = null;
            } else {
              nodeData["parent"].right = null;
            }
          } else {
            setRoot(null); // If it's the root node being deleted
          }
          // display alert
          setAlertMessage({
            alertMessage: "Node deleted successfully",
            typeMessage: "success",
          });
          setAlertVisible(true);
          setRoot({ ...root }); // Trigger re-render
          break;
      }
    }

    // reset
    setInputValue("");
    setOperation("");
    setOperationString("");
    setModalVisible(false);
    setInputModalVisible(false);
    setNodeData("");
    // reset after animation fades out
    setTimeout(() => {
      setAlertMessage({ alertMessage: "", typeMessage: "" });
      setAlertVisible(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onAddRootNode = () => {
    const newRootValue = prompt("Enter root node value:");
    if (!isNaN(newRootValue)) {
      setRoot({
        value: parseInt(newRootValue),
        left: null,
        right: null,
      });
    } else {
      alert("Please enter a valid number.");
    }
  };

  return (
    <div id="section-BT">
      <h1>Binary Tree Playground</h1>

      {alertMessage && (
        <div className={`alert-modal ${typeMessage}`}> {alertMessage}</div>
      )}

      {nodeData && (
        <div>
          <div className="block-node-selected">
            Node selected = {nodeData["node"].value}
          </div>
          <div>Select the operation you would like to perform</div>
          <ul className="operation-list">
            {nodeData && !nodeData["node"].left && (
              <li
                onClick={() => {
                  setOperation(1);
                  setOperationString("Add left node");
                  setInputModalVisible(true);
                }}
              >
                Add left node
              </li>
            )}
            {nodeData && !nodeData["node"].right && (
              <li
                onClick={() => {
                  setOperation(2);
                  setOperationString("Add right node");
                  setInputModalVisible(true);
                }}
              >
                Add right node
              </li>
            )}
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
                performOperation();
              }}
            >
              Delete node
            </li>
          </ul>

          {inputModalVisible && !alertVisible && operation != 4 && (
            <div>
              <div onClick={() => setInputModalVisible(false)}>✖</div>
              <h3>{operationString}</h3>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Enter value`}
                className="custom-input"
              />
              <button onClick={() => performOperation()}>Submit</button>
            </div>
          )}
        </div>
      )}

      {root ? (
        <BinaryTreeVisualizer root={root} onNodeClick={handleNodeClick} />
      ) : (
        <div className="binary-tree-empty">
          <p>Tree is empty. Please add a new root node.</p>
          <button onClick={onAddRootNode} className="add-root-button">
            Add Root Node
          </button>
        </div>
      )}

      {/* <Modal
        isVisible={modalVisible}
        onClose={() => {
          console.log("clicked");
          setModalVisible(false);
        }}
      >
        {nodeData && <div>Node selected {nodeData["node"].value}</div>}
        <ul className="operation-list">
          {nodeData && !nodeData["node"].left && (
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
          )}
          {nodeData && !nodeData["node"].right && (
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
          )}
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
      </Modal> */}
    </div>
  );
};

export default BinaryTreePlayground;
