import "../dataStructures.css";
import arrayImg from "../assets/images/array_ds.png";
import stackImg from "../assets/images/stack_ds.png";
import queueImg from "../assets/images/queue_ds.png";
import llImg from "../assets/images/linkedlist_ds.png";
import btImg from "../assets/images/binarytree_ds.png";

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

function DataStructures({ navigateToInstructions }) {
  return (
    <section className="data-structures">
      <h2>Available Data Structures</h2>
      <div className="data-structure-cards">
        {dataStructures.map((ds) => (
          <div
            key={ds.key}
            className="data-structure-card"
            onClick={() => navigateToInstructions(ds.key)}
          >
            <img src={ds.imgSrc} alt={`${ds.title} icon`} />
            <h3>{ds.title}</h3>
            <p>{ds.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DataStructures;
