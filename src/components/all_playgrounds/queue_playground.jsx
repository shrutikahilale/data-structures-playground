import { useState } from "react";
import "./css/block.css";
import "./css/utility.css";
import "./css/playground.css";

export default function QueuePlayground() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [queueSize, setQueueSize] = useState(10);

  const [typeError, setTypeError] = useState("");
  const [sizeError, setSizeError] = useState("");

  const enque = () => {
    const numValue = parseFloat(value.trim());

    if (queue.length === queueSize) {
      setSizeError(`Adjust the size or remove some elements`);
      setTypeError("");
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      setSizeError("");
    } else {
      if (queue.size == 0) {
        setSizeError("No elements found, bug nhi hai broo");
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
    if (queue.length === 0) {
      setSizeError("No elements found to be removed");
    } else {
      setSizeError("");
      const newQueue = queue.slice(1);
      setQueue(newQueue);
    }
  };

  // get the num value
  const numValue = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  // Update stack size
  const updateArraySize = (inputValue) => {
    const val = numValue(inputValue);

    // Allow the value to change first, then validate it.
    if (val === 0 || val === "") {
      setSizeError("Stack size must be greater than zero.");
    } else if (val < queue.filter((e) => e !== null).length) {
      setSizeError(
        "Stack size cannot be smaller than the current number of elements."
      );
    } else {
      setQueue([]);
      setSizeError("");
      setQueueSize(val);
    }
  };

  const [inputArraySize, setInputArraySize] = useState(queueSize);

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
        {/* <button onClick={resetAll} className="reset-op">
          Reset
        </button> */}
      </div>

      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={inputArraySize}
          onChange={(e) => setInputArraySize(e.target.value)}
          placeholder={`Enter array size (default to ${queueSize})`}
          className="custom-input"
        />
        <button
          onClick={() => updateArraySize(inputArraySize)}
          className="gen-op"
        >
          Update Size
        </button>
      </div>

      {typeError && <p className="error-message">{typeError}</p>}
      {sizeError && <p className="error-message">{sizeError}</p>}

      {queue.length > 0 && (
        <div className="outer-block">
          {queue.map((e, i) => (
            <div key={i} className="inner-block">
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
