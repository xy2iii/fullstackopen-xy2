import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ value }) => <div>{value}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = (props) => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => setValue(newValue);

  return (
    <div>
      <Display value={value}></Display>
      <Button handleClick={setToValue(1000)} text="thousand"></Button>
      <Button handleClick={setToValue(0)} text="reset" />
      <Button handleClick={setToValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
