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

  // add an element to the array
  const add = () => {
    const numValue = parseFloat(value.trim());

    if (array.filter((e) => e !== null).length >= arraySize) {
      setSizeError(`Array size limit of ${arraySize} exceeded.`);
      setTypeError("");
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      setSizeError("");
    } else {
      const newArray = [...array];
      const firstNullIndex = newArray.indexOf(null);
      if (firstNullIndex !== -1) {
        newArray[firstNullIndex] = numValue;
        setArray(newArray);
        setValue("");
        setTypeError("");
        setSizeError("");
      }
    }
  };

  // remove element from the array
  const remove = () => {
    if (eIndex == "") {
      setSizeError("No index passed");
    } else {
      const indexToRemove = parseInt(eIndex, 10); // Convert eIndex to a number
      if (array.length > 0 && indexToRemove > -1 && indexToRemove < arraySize) {
        const newArray = [...array];
        newArray.splice(indexToRemove, 1); // Remove the element at the specified index
        newArray.push(null); // Add a null at the end to keep the array size consistent
        setArray(newArray); // Update the state with the modified array
        setEIndex(""); // Clear the index input field
      } else if (array.length <= 0) {
        setSizeError("No elements found which can be removed");
      } else if (indexToRemove < 0) {
        setSizeError("Index is invalid bro!!");
      } else if (indexToRemove >= array.length) {
        setSizeError("Index exceeded array sizeee");
      }
    }
  };

  // get the numeric value
  const numValue = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, ""); // Remove non-digit characters
    const parsedValue = parseInt(sanitizedValue, 10);
    return isNaN(parsedValue) ? "" : parsedValue;
  };

  // update array size
  const updateArraySize = (inputValue) => {
    const val = numValue(inputValue);

    if (val === 0 || val === "") {
      setSizeError("Array size must be greater than zero.");
    } else if (val < array.filter((e) => e !== null).length) {
      setSizeError(
        "Array size cannot be smaller than the current number of elements."
      );
    } else {
      setSizeError("");
      const newArray = [...array];
      if (val > arraySize) {
        newArray.length = val; // Increase the array size
        newArray.fill(null, arraySize); // Fill the new slots with null
      } else if (val < arraySize) {
        newArray.length = val; // Reduce the array size
      }
      setArray(newArray);
      setArraySize(val);
    }
  };

  // reset everything
  const resetAll = () => {
    setArray(new Array(initialArraySize).fill(null));
    setArraySize(initialArraySize);
    setValue("");
    setEIndex("");
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
      <input
        type="text"
        value={eIndex}
        onChange={(e) => setEIndex(e.target.value)}
        placeholder="Enter index to be removed"
        className="custom-input"
      />
      <div className="operations-section">
        <button onClick={add} className="positive-op">
          Add
        </button>
        <button onClick={remove} className="negative-op">
          Remove at index
        </button>
        <button onClick={resetAll} className="reset-op">
          Reset
        </button>
      </div>
      <input
        type="text"
        value={arraySize}
        onChange={(e) => updateArraySize(e.target.value)}
        placeholder={`Enter array size (default to ${arraySize})`}
        className="custom-input"
      />
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
