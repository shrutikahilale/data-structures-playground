import { useState } from "react";
import "./css/block.css";
import "./css/utility.css";
import "./css/playground.css";

export default function ArrayPlayground() {
  const initialArraySize = 4;

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(initialArraySize);
  const [value, setValue] = useState("");
  const [typeError, setTypeError] = useState("");
  const [sizeError, setSizeError] = useState("");

  // add an element to the array
  const add = () => {
    const numValue = parseFloat(value.trim());

    if (array.length >= arraySize) {
      setSizeError(`Array size limit of ${arraySize} exceeded.`);
      setTypeError("");
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      setSizeError("");
    } else {
      setArray([...array, numValue]);
      setValue("");
      setTypeError("");
      setSizeError("");
    }
  };

  // remove last element from the array
  const remove = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1));
    }
  };

  // get the num value
  const numValue = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  // update array size
  const updateArraySize = (inputValue) => {
    const val = numValue(inputValue);

    // Allow the value to change first, then validate it.
    if (val === 0 || val === "") {
      setSizeError("Array size must be greater than zero.");
    } else if (val < array.length) {
      setSizeError(
        "Array size cannot be smaller than the current number of elements."
      );
    } else {
      setSizeError("");
    }

    setArraySize(val);
  };

  // reset everything
  const resetAll = () => {
    setArray([]);
    setArraySize(initialArraySize);
    setValue("");
    setTypeError("");
    setSizeError("");
  };

  return (
    <div className="playground-section">
      <h1>Array Playground</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a number"
        className="custom-input"
      />
      <div className="operations-section">
        <button onClick={add} className="positive-op">
          Add
        </button>
        <button onClick={remove} className="negative-op">
          Remove
        </button>
        <button onClick={resetAll} className="reset-op">
          Reset
        </button>
      </div>
      <input
        type="text"
        value={arraySize}
        onChange={(e) => updateArraySize(e.target.value)}
        placeholder="Enter array size (default to 4)"
        className="custom-input"
      />
      {typeError && <p className="error-message">{typeError}</p>}
      {sizeError && <p className="error-message">{sizeError}</p>}
      {array.length > 0 && (
        <div className="outer-block">
          {array.map((e, i) => (
            <div key={i} className="inner-block">
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
