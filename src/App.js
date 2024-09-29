import React, { useState } from "react";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [newInput, setNewInput] = useState(true);

  const handleClick = (value) => {
    if (!isNaN(value)) {
      handleNumber(value);
    } else if (value === "=") {
      handleEquals();
    } else if (value === ".") {
      handleDecimal();
    } else if (value === "C") {
      handleClear();
    } else {
      handleOperator(value);
    }
  };

  const handleNumber = (num) => {
    if (newInput) {
      setDisplayValue(num);
      setNewInput(false);
    } else {
      setDisplayValue(displayValue === "0" ? num : displayValue + num);
    }
    setExpression(expression + num);
  };

  const handleOperator = (operator) => {
    setExpression(expression + operator);
    setNewInput(true);
  };

  const handleEquals = () => {
    try {
      const result = eval(expression);
      setDisplayValue(result);
      setExpression(result);
    } catch (e) {
      setDisplayValue("Error");
    }
  };

  const handleDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
      setExpression(expression + ".");
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setNewInput(true);
  };

  return (
    <div id="calculator">
      <div id="display">{displayValue}</div>
      <div id="buttons">
        {[
          "C",
          "/",
          "*",
          "-",
          "+",
          "=",
          ".",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ].map((btn) => (
          <Button key={btn} value={btn} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

const Button = ({ value, onClick }) => (
  <button id={value} onClick={() => onClick(value)}>
    {value}
  </button>
);

export default App;
