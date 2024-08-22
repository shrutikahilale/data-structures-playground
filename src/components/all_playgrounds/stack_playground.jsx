import { useState } from "react";
import "./css/block.css";
import "./css/utility.css";
import "./css/playground.css";
export default function StackPlayground() {
  const initialArraySize = 10;

  const [stack, setStack] = useState(new Array(initialArraySize).fill(null));
  const [stackSize, setStackSize] = useState(initialArraySize);
  const [value, setValue] = useState("");
  const [typeError, setTypeError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [lastNonNullIndex, setLastNonNullIndex] = useState(-1);

  console.log(stack, " ", lastNonNullIndex);
  // add an element to the stack
  const push = () => {
    const numValue = parseFloat(value.trim());

    if (stack.filter((e) => e !== null).length >= stackSize) {
      setSizeError(
        `Stack overfloweddd... Adjust the size or pop out some elements`
      );
      setTypeError("");
    } else if (isNaN(numValue)) {
      setTypeError("Please enter a valid number.");
      setSizeError("");
    } else {
      const newStack = [...stack];
      const firstNullIndex = newStack.indexOf(null);
      if (firstNullIndex !== -1) {
        newStack[firstNullIndex] = numValue;
        setStack(newStack);
        setValue("");
        setTypeError("");
        setSizeError("");
        setLastNonNullIndex(lastNonNullIndex + 1);
      }
    }
  };

  // Remove the last element from the stack
  const pop = () => {
    if (lastNonNullIndex !== -1) {
      const newStack = [...stack];
      newStack[lastNonNullIndex] = null;
      setStack(newStack);
      setSizeError("");
      setLastNonNullIndex(lastNonNullIndex - 1);
    } else {
      setSizeError(`No element found to pop out!!`);
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
    } else if (val < stack.filter((e) => e !== null).length) {
      setSizeError(
        "Stack size cannot be smaller than the current number of elements."
      );
    } else {
      const newStack = [...stack];
      newStack.length = val;
      setStack(newStack.fill(null, stack.filter((e) => e !== null).length));
      setStackSize(val);
      setSizeError("");
    }
  };

  // reset everything
  const resetAll = () => {
    setStack([]);
    setStackSize(initialArraySize);
    setValue("");
    setTypeError("");
    setSizeError("");
  };

  const [inputArraySize, setInputArraySize] = useState(stackSize);

  return (
    <div className="playground-section">
      <h1>Stack Playground</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a number"
        className="custom-input"
      />
      <div className="operations-section">
        <button onClick={push} className="positive-op">
          Push In
        </button>
        <button onClick={pop} className="negative-op">
          Pop out
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
          placeholder={`Enter array size (default to ${stackSize})`}
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

      <div className="outer-block stack-visual">
        {stack.map((e, i) => (
          <div key={i} className={`inner-block ${e === null ? "empty" : ""}`}>
            {e !== null ? e : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
