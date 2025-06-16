import { useState } from "react";
import "../Component/styles.css";

function Calculator() {
  const [state, setState] = useState({
    operand1: "",
    operand2: "",
    operator: "+",
    result: "",
  });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateResult = () => {
    const num1 = parseFloat(state.operand1);
    const num2 = parseFloat(state.operand2);

    if (isNaN(num1) || isNaN(num2)) {
      setState((prevState) => ({
        ...prevState,
        result: "Invalid input",
      }));
      return;
    }

    let calcResult;
    switch (state.operator) {
      case "+":
        calcResult = num1 + num2;
        break;
      case "-":
        calcResult = num1 - num2;
        break;
      case "*":
        calcResult = num1 * num2;
        break;
      case "/":
        calcResult = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
      default:
        calcResult = "Invalid operator";
    }

    setState((prevState) => ({
      ...prevState,
      result: calcResult,
    }));

    setHistory((prevHistory) => [
      ...prevHistory,
      `${state.operand1} ${state.operator} ${state.operand2} = ${calcResult}`,
    ]);
  };

  const resetCalculator = () => {
    setState({
      operand1: "",
      operand2: "",
      operator: "+",
      result: "",
    });
  };

  return (
    <>
      <div className="calculator">
        <div className="operand-row">
          <div>
            <input
              type="number"
              name="operand1"
              value={state.operand1}
              onChange={handleChange}
              placeholder="Operand 1"
              className="operand"
            />
            {state.error && <div className="error">{state.error}</div>}
          </div>
          <select
            name="operator"
            value={state.operator}
            onChange={handleChange}
            className="operator operator-dropdown"
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input
            type="number"
            name="operand2"
            value={state.operand2}
            onChange={handleChange}
            placeholder="Operand 2"
            className="operand"
          />
          <button onClick={calculateResult} className="operator">
            Calculate
          </button>
        </div>
        <div className="result-row">
          <div className="result">Result: {state.result}</div>
          <button onClick={resetCalculator} className="reset-button">
            X
          </button>
        </div>
        <button
          onClick={() => {
            if (history.length === 0) {
              alert("No history to show");
              return;
            }
            setShowHistory(!showHistory);
          }}
          className="toggle-history-button"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {showHistory && (
          <div className="history">
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Calculator;
