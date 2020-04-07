import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  const part = props.part
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      <Part part={parts[0]}></Part>
      <Part part={parts[1]}></Part>
      <Part part={parts[2]}></Part>
    </>
  );
};

const Total = (props) => {
  let sum = 0
  props.parts.forEach(part => {
    sum += part.exercises
  })
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
