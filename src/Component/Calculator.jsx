import { useState } from "react";
import "../Component/styles.css";

function Calculator() {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState("");

  const handleOperand1Change = (e) => {
    setOperand1(e.target.value);
  };

  const handleOperand2Change = (e) => {
    setOperand2(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const calculateResult = () => {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult("Invalid input");
      return;
    }

    let resultValue;
    switch (operator) {
      case "+":
        resultValue = num1 + num2;
        break;
      case "-":
        resultValue = num1 - num2;
        break;
      case "*":
        resultValue = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          resultValue = "Cannot divide by zero";
        } else {
          resultValue = num1 / num2;
        }
        break;
      default:
        resultValue = "Unknown operator";
    }

    setResult(resultValue);
  };

  return (
    <div className="calculator">
      <input
        type="number"
        className="operand"
        value={operand1}
        onChange={handleOperand1Change}
        placeholder="First number"
      />
      <select
        value={operator}
        className="operator"
        onChange={handleOperatorChange}
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        className="operand"
        value={operand2}
        onChange={handleOperand2Change}
        placeholder="Second number"
      />
      <button type="button" className="operator" onClick={calculateResult}>
        =
      </button>
      <span className="result">{result}</span>
    </div>
  );
}

export default Calculator;
