import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, value }) => (
  <p>
    <span>{text}</span>
    &nbsp;
    <span>{value}</span>
  </p>
);

const GiveFeedback = ({ feedback }) => {
  const plusFeedback = (type) => () => {
    const f = feedback[type];
    f.setState(f.state + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={plusFeedback("good")} text="good"></Button>
      <Button handleClick={plusFeedback("neutral")} text="neutral"></Button>
      <Button handleClick={plusFeedback("bad")} text="bad"></Button>
    </>
  );
};

const Statistics = ({ feedback }) => {
  return (
    <>
      <h1>statistics</h1>
      <Display text="good" value={feedback.good.state}></Display>
      <Display text="neutral" value={feedback.neutral.state}></Display>
      <Display text="bad" value={feedback.bad.state}></Display>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedback = {
    good: {
      state: good,
      setState: setGood,
    },
    neutral: {
      state: neutral,
      setState: setNeutral,
    },
    bad: {
      state: bad,
      setState: setBad,
    },
  };

  return (
    <div>
      <GiveFeedback feedback={feedback}></GiveFeedback>
      <Statistics feedback={feedback}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
