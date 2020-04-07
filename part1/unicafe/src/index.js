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

const Statistics = ({ results }) => {
  const [good, neutral, bad] = results;

  const sum = results.reduce((a, b) => a + b);
  const average = sum / results.length;
  const positivePercentage = (good / sum) * 100;
  const displayedPercentage = isNaN(positivePercentage)
    ? 0
    : positivePercentage;

  return (
    <>
      <h1>statistics</h1>
      <Display text="good" value={good}></Display>
      <Display text="neutral" value={neutral}></Display>
      <Display text="bad" value={bad}></Display>
      <Display text="average" value={average}></Display>
      <Display text="positive" value={displayedPercentage + "%"}></Display>
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

  const results = [
    feedback.good.state,
    feedback.neutral.state,
    feedback.bad.state,
  ];

  return (
    <div>
      <GiveFeedback feedback={feedback}></GiveFeedback>
      <Statistics results={results}></Statistics>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
