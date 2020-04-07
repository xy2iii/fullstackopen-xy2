import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdotes, selected, setSelected, points, setPoints }) => {
  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const newQuote = () => setSelected(randInt(0, anecdotes.length - 1));
  const voteForQuote = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteForQuote}>vote</button>
      <button onClick={newQuote}>next anecdote</button>
    </>
  );
};

const BestQuote = ({ anecdotes, points }) => {
  const best = points.indexOf(Math.max(...points));
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[best]}</div>
      <div>has {points[best]} votes</div>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  return (
    <>
      <Anecdote
        anecdotes={anecdotes}
        selected={selected}
        setSelected={setSelected}
        points={points}
        setPoints={setPoints}
      ></Anecdote>
      <BestQuote anecdotes={anecdotes} points={points}></BestQuote>
    </>
  );
};

const allAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
  <App anecdotes={allAnecdotes} />,
  document.getElementById("root")
);
