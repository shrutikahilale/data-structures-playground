import React, { useState } from "react";
import "./dataStructures.css"; // Make sure to create this CSS file for styling
import arrayImg from "./assets/images/array_ds.png";
import stackImg from "./assets/images/stack_ds.png";
import queueImg from "./assets/images/queue_ds.png";
import llImg from "./assets/images/linkedlist_ds.png";
import btImg from "./assets/images/binarytree_ds.png";
import InstructionsComponent from "./components/instructions";

const App = () => {
  const dataStructures = [
    {
      key: "array",
      title: "Array",
      description:
        "A collection of elements stored in contiguous memory locations.",
      imgSrc: arrayImg,
    },
    {
      key: "stack",
      title: "Stack",
      description:
        "A collection of elements that follows the Last In, First Out (LIFO) principle.",
      imgSrc: stackImg,
    },
    {
      key: "queue",
      title: "Queue",
      description:
        "A collection of elements that follows the First In, First Out (FIFO) principle.",
      imgSrc: queueImg,
    },
    {
      key: "linkedList",
      title: "Linked List",
      description:
        "A linear collection of elements, where each element points to the next one.",
      imgSrc: llImg,
    },
    {
      key: "binaryTree",
      title: "Binary Tree",
      description:
        "A hierarchical structure where each node has at most two children (left and right).",
      imgSrc: btImg,
    },
  ];

  const [showHomepage, setShowHomepage] = useState(true);
  const [selectedDs, setSelectedDs] = useState("");

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Data Structure Playground!</h1>
        <p>
          Explore and interact with various data structures to deepen your
          understanding.
        </p>
      </header>

      <main className="main-content">
        {showHomepage ? (
          <section className="data-structures">
            <h2>Available Data Structures</h2>
            <div className="data-structure-cards">
              {dataStructures.map((ds, index) => (
                <div
                  key={index}
                  className="data-structure-card"
                  onClick={() => {
                    setShowHomepage(false);
                    setSelectedDs(ds.key);
                  }}
                >
                  <img src={ds.imgSrc}></img>
                  <h3>{ds.title}</h3>
                  <p>{ds.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <InstructionsComponent
            ds={selectedDs}
            setShowHomepage={setShowHomepage}
            setSelectedDs={setSelectedDs}
          />
        )}
      </main>

      <footer className="footer">
        <p>
          Have Questions or Feedback? Feel free to <a href="#">contact us</a> or
          check out our <a href="#">documentation</a> for more information.
        </p>
      </footer>
    </div>
  );
};

export default App;
