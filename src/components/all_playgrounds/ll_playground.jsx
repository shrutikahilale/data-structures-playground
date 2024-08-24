import { useState } from "react";
import "./css/playground.css";
import "./css/block.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LinkedListPlayground() {
  const [linkedList, setLinkedList] = useState([1, 2]);
  const [value, setValue] = useState("");
  const [idx, setIdx] = useState("");
  const [error, setError] = useState("");

  const numValue = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  const insertNodeAtIdx = () => {
    const val = numValue(value);
    const index = numValue(idx);

    if (val === "") {
      setError("Value is NAN");
    } else if (index === "") {
      setError("Index is NAN");
    } else if (index > linkedList.length) {
      setError(
        `Cannot insert at invalid index (${index}) is greater than number of elements (${linkedList.length})`
      );
    } else {
      setError("");
      linkedList.splice(index, 0, val);
      /**
       * splice(start, deleteCount, item1, item2, ...):
start: The index at which to start changing the array. 
deleteCount: An integer indicating the number of elements to remove. (Here, 0, so no elements are removed.)
item1, item2, ...: The elements to add to the array, starting at the start index.
its inplace
       */
    }
  };

  return (
    <div>
      <h1>Linked List Playground</h1>

      {linkedList.length > 0 && (
        <div className="linked-list-visual">
          {linkedList.map((e, index) => (
            <div key={index} className="linked-list-outer-block">
              <div className="linked-list-block">{e}</div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          ))}
          <div className="linked-list-block">null</div>
        </div>
      )}

      {error && <div>{error}</div>}

      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="custom-input"
        />
        <input
          type="text"
          value={idx}
          onChange={(e) => setIdx(e.target.value)}
          placeholder="Node insertion index"
          className="custom-input"
        />

        <button onClick={insertNodeAtIdx} className="positive-op">
          Add
        </button>
      </div>
    </div>
  );
}
