import { useState, useEffect } from "react";
import "./css/playground.css";
import "./css/block.css";
import "./css/ll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const timings = {
  create: 4000,
  insert: 2000,
  delete: 1000,
};

export default function LinkedListPlayground() {
  const [linkedList, setLinkedList] = useState([1, 2]);
  const [val1, setVal1] = useState("");
  const [index, setIndex] = useState("");
  const [operation, setOperation] = useState(null); // Track the operation and index
  const [error, setError] = useState("");

  const numValue = (val) => {
    const sanitizedValue = val.replace(/[^\d]/g, "");
    return isNaN(parseInt(sanitizedValue, 10))
      ? ""
      : parseInt(sanitizedValue, 10);
  };

  const validateInput = (val, idx) => {
    if (val.trim() === "") return "Please enter value";
    if (idx.trim() === "") return "Please enter index";
    const value = numValue(val);
    const index = numValue(idx);
    if (value === "") return "Value is NAN";
    if (index === "") return "Index is NAN";
    if (index > linkedList.length)
      return `Cannot insert at invalid index (${index})`;
    return "";
  };

  const insertNodeAtIdx = () => {
    const validationError = validateInput(val1, index);
    if (validationError) return setError(validationError);

    const idx = numValue(index);
    // first show create node animation
    setOperation({ type: "create" });

    // after create animation delay, show insert node animation
    setTimeout(() => {
      setOperation({ type: "insert", index: idx });
      setLinkedList((prevList) => {
        const ll = [...prevList];
        ll.splice(idx, 0, numValue(val1));
        return ll;
      });
      setVal1("");
      setIndex("");
      setError("");
    }, timings.create); // Delay the insertion to match the create animation duration
  };

  const deleteNodeAtIdx = () => {
    if (index.trim() === "") return setError("Please enter index");

    const idx = numValue(index);
    if (idx === "") return setError("Index is NAN");
    if (idx > linkedList.length - 1)
      return setError(`Cannot delete from invalid index (${idx})`);

    setOperation({ type: "delete", index: idx });
    setError("");

    // Delay the actual deletion to allow the animation to play
    setTimeout(() => {
      setLinkedList((prevList) => {
        const ll = [...prevList];
        ll.splice(idx, 1);
        return ll;
      });
      setOperation(null); // Reset operation state after deletion
      setVal1("");
      setIndex("");
    }, deleteAnimationDuration); // Match the duration of the delete animation
  };

  // Use useEffect to handle operation timing
  useEffect(() => {
    if (operation) {
      const duration = timings[operation.type];
      console.log("duration ", duration);
      const timer = setTimeout(() => setOperation(null), duration);
      return () => clearTimeout(timer);
    }
  }, [operation]);

  return (
    <div>
      <h1>Linked List Playground</h1>

      {operation?.type === "create" && (
        <div className="linked-list-outer-block animate-create">
          <div className="linked-list-block">{val1}</div>
          <FontAwesomeIcon className="linked-list-arrow" icon={faArrowRight} />
        </div>
      )}

      {linkedList.length > 0 && (
        <div className="linked-list-visual">
          {linkedList.map((e, idx) => (
            <div
              key={idx}
              className={`linked-list-outer-block ${
                operation?.type === "insert" && operation.index === idx
                  ? "animate-insert"
                  : operation?.type === "delete" && operation.index === idx
                    ? "animate-delete"
                    : ""
              }`}
            >
              <div className="linked-list-block">{e}</div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          ))}
          <div className="linked-list-block">null</div>
        </div>
      )}

      {error && <div>{error}</div>}

      <div className="operations-section">
        <input
          type="text"
          value={val1}
          onChange={(e) => setVal1(e.target.value)}
          placeholder="Value"
          className="custom-input"
        />
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          placeholder="Node index"
          className="custom-input"
        />
        <button onClick={insertNodeAtIdx} className="positive-op">
          Add
        </button>
        <button onClick={deleteNodeAtIdx} className="negative-op">
          Delete
        </button>
      </div>
    </div>
  );
}
