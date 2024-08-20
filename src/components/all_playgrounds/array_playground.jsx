import { useState } from "react";
import "./css/block.css";
import "./css/utility.css";
import "./css/playground.css";

const initialArraySize = 4;

export default function ArrayPlayground() {
  const [array, setArray] = useState(new Array(initialArraySize).fill(null));
  const [arraySize, setArraySize] = useState(initialArraySize);
  const [value, setValue] = useState("");
  const [eIndex, setEIndex] = useState("");
  const [typeError, setTypeError] = useState("");
  const [sizeError, setSizeError] = useState("");

  // Helper functions
  const clearErrors = () => {
    setTypeError("");
    setSizeError("");
  };

  const numValue = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  const isValidIndex = (index) => index >= 0 && index < arraySize;

  const getNonNullElementsCount = () =>
    array.filter((element) => element !== null).length;

  // Action functions
  const addElement = () => {
    clearErrors();
    const numValue = parseInt(value.trim());

    if (getNonNullElementsCount() >= arraySize) {
      setSizeError(`Array size limit of ${arraySize} exceeded.`);
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
    } else {
      const newArray = [...array];
      const firstNullIndex = newArray.indexOf(null);
      if (firstNullIndex !== -1) {
        newArray[firstNullIndex] = numValue;
        setArray(newArray);
        setValue("");
      }
    }
  };

  const removeElement = () => {
    clearErrors();
    if (eIndex === "") {
      setSizeError("No index passed");
      return;
    }

    const indexToRemove = numValue(eIndex);

    if (array.length === 0) {
      setSizeError("No elements found which can be removed");
    } else if (!isValidIndex(indexToRemove)) {
      setSizeError("Invalid index");
    } else if (array[indexToRemove] === null) {
      setSizeError("Value not found, please add an element at the index");
    } else {
      const newArray = [...array];
      newArray.splice(indexToRemove, 1);
      newArray.push(null);
      setArray(newArray);
      setEIndex("");
    }
  };

  const updateElement = () => {
    clearErrors();
    const numValue = parseFloat(value.trim());
    const indexToUpdate = parseInt(eIndex, 10);

    if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      return;
    }

    if (eIndex === "") {
      setSizeError("No index passed");
      return;
    }

    if (!isValidIndex(indexToUpdate)) {
      setSizeError("Index out of bounds");
      return;
    }

    const newArray = [...array];
    newArray[indexToUpdate] = numValue;
    setArray(newArray);
    setValue("");
    setEIndex("");
  };

  const updateArraySize = (inputValue) => {
    const val = numValue(inputValue);

    if (val === 0 || val === "") {
      setSizeError("Array size must be greater than zero.");
    } else if (val < getNonNullElementsCount()) {
      setSizeError(
        "Array size cannot be smaller than the current number of elements."
      );
    } else {
      clearErrors();
      const newArray = [...array];
      if (val > arraySize) {
        newArray.length = val;
        newArray.fill(null, arraySize);
      } else if (val < arraySize) {
        newArray.length = val;
      }
      setArray(newArray);
      setArraySize(val);
    }
  };

  const resetAll = () => {
    clearErrors();
    setArray(new Array(initialArraySize).fill(null));
    setArraySize(initialArraySize);
    setValue("");
    setEIndex("");
  };

  const [inputArraySize, setInputArraySize] = useState(arraySize);

  return (
    <div className="playground-section">
      <h1>Array Playground</h1>
      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className="custom-input"
        />
        <button onClick={addElement} className="positive-op">
          Add
        </button>
      </div>

      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={eIndex}
          onChange={(e) => setEIndex(e.target.value)}
          placeholder="Enter index to be removed"
          className="custom-input"
        />
        <button onClick={removeElement} className="negative-op">
          Remove at index
        </button>
      </div>

      <div className="display-flex  gap-10 w-100per ">
        <button onClick={updateElement} className="gen-op">
          Update at index
        </button>
        <button onClick={resetAll} className="reset-op">
          Reset
        </button>
      </div>
      <div className="display-flex  gap-10 w-100per jc-center">
        <input
          type="text"
          value={inputArraySize}
          onChange={(e) => setInputArraySize(e.target.value)}
          placeholder={`Enter array size (default to ${arraySize})`}
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
      <div className="outer-block">
        {array.map((e, i) => (
          <div key={i} className={`inner-block ${e === null ? "empty" : ""}`}>
            {e !== null ? e : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
