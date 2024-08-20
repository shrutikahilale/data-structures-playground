import { useState } from "react";
import "./css/block.css";
import "./css/utility.css";
import "./css/playground.css";

export default function QueuePlayground() {
  const [queue, setQueue] = useState([]);
  const [queueSize, setQueueSize] = useState(10);
  const [leftPtr, setLeftPtr] = useState(-1);
  const [rightPtr, seRightPtr] = useState(-1);

  const enque = () => {
    const numValue = parseFloat(value.trim());

    if (queue.filter((e) => e !== null).length >= queueSize) {
      setSizeError(`Adjust the size or remove some elements`);
      setTypeError("");
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      setSizeError("");
    } else {
      if ((leftPtr === rightPtr) === -1) {
        setSizeError("No elements found, bug nhi hai broo");
      } else if (leftPtr > rightPtr) {
        setSizeError(
          "Left Pointer crossed the Right Pointer, naye elements add karne padenge"
        );
      } else {
        // add elements at the right ptr
        queue.push(numValue);
        setValue("");
        setTypeError("");
        setSizeError("");
      }
    }
  };

  const deque = () => {
    if ((leftPtr === rightPtr) === -1) {
      setSizeError("No elements found, bug nhi hai broo");
    } else if (leftPtr > rightPtr) {
      setSizeError(
        "Left Pointer crossed the Right Pointer, naye elements add karne padenge"
      );
    } else {
      // remove elements from the right ptr
      queue.splice(rightPtr, 1);
    }
  };

  return (
    <div className="playground-section">
      <h1>Queue Playground</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a number"
        className="custom-input"
      />

      <div className="operations-section">
        <button onClick={enque} className="positive-op">
          Enque
        </button>
        <button onClick={deque} className="negative-op">
          Deque
        </button>
        <button onClick={resetAll} className="reset-op">
          Reset
        </button>
      </div>

      <input
        type="text"
        value={queueSize}
        onChange={(e) => updateQueueSize(e.target.value)}
        placeholder={`Enter queue size (default to ${queueSize})`}
        className="custom-input"
      />
      {typeError && <p className="error-message">{typeError}</p>}
      {sizeError && <p className="error-message">{sizeError}</p>}

      <div className="queue-visual">
        <div className="outer-block">
          {queue.map((e, i) => (
            <div key={i} className={`inner-block ${e === null ? "empty" : ""}`}>
              {e !== null ? e : ""}
            </div>
          ))}
        </div>
        <div className="op-blocks-section">
          <div className="op-blocks">Pop</div>
          <div className="op-blocks">Push</div>
        </div>
      </div>
    </div>
  );
}
