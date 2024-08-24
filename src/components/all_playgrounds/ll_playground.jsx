import { useState } from "react";
import "./css/playground.css";
import "./css/block.css";
import "./css/ll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LinkedListPlayground() {
  const [linkedList, setLinkedList] = useState([1, 2]);
  const [val1, setVal1] = useState("");
  const [idxToAddAt, setIdxToAddAt] = useState("");
  const [val2, setVal2] = useState("");
  const [idxToRemoveFrom, setIdxToRemoveFrom] = useState("");
  const [error, setError] = useState("");

  const numValue = (val1) => {
    const sanitizedValue = val1.replace(/[^\d]/g, "");
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  const insertNodeAtIdx = () => {
    if (val1.trim() === "") {
      setError("Please enter value");
    } else if (idxToAddAt.trim() === "") {
      setError("Please enter index");
    } else {
      const val = numValue(val1.trim());
      const index = numValue(idxToAddAt.trim());

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
        const ll = [...linkedList];
        ll.splice(index, 0, val);
        setLinkedList(ll);

        setVal1("");
        setIdxToAddAt("");
      }
    }
  };

  const deleteNodeAtIdx = () => {
    if (idxToRemoveFrom.trim() === "") {
      setError("Please enter index");
    } else {
      const index = numValue(idxToRemoveFrom.trim());
      if (index === "") {
        setError("Index is NAN");
      } else if (index > linkedList.length) {
        setError(
          `Cannot delete from invalid index, (${index}) is greater than number of elements (${linkedList.length})`
        );
      } else {
        setError("");
        const ll = [...linkedList];
        ll.splice(index, 1);
        setLinkedList(ll);
        setIdxToRemoveFrom("");
      }
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
          value={val1}
          onChange={(e) => setVal1(e.target.value)}
          placeholder="Value"
          className="custom-input"
        />
        <input
          type="text"
          value={idxToAddAt}
          onChange={(e) => setIdxToAddAt(e.target.value)}
          placeholder="Node insertion index"
          className="custom-input"
        />

        <button onClick={insertNodeAtIdx} className="positive-op">
          Add
        </button>
      </div>

      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={idxToRemoveFrom}
          onChange={(e) => setIdxToRemoveFrom(e.target.value)}
          placeholder="Node deletion index"
          className="custom-input"
        />

        <button onClick={deleteNodeAtIdx} className="negative-op">
          Delete
        </button>
      </div>
    </div>
  );
}
