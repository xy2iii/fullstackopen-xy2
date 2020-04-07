import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ results }) => {
  const [good, neutral, bad] = results;

  const sum = results.reduce((a, b) => a + b);
  // If there are no votes, then there's no feedback.
  if (sum === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  const average = sum / results.length;
  const positivePercentage = (good / sum) * 100;
  const displayedPercentage = isNaN(positivePercentage)
    ? 0
    : positivePercentage;

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="average" value={average}></Statistic>
          <Statistic
            text="positive"
            value={displayedPercentage + "%"}
          ></Statistic>
        </tbody>
      </table>
    </>
  );
};

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
