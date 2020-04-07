import React from 'react'

const Header = (props) => {
  return <h2>{props.name}</h2>
}

const Part = (props) => {
  const part = props.part
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.forEach((part) => {
    sum += part.exercises
  })
  return <strong>Number of exercises {sum}</strong>
}

const Course = ({ course }) => (
  <>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </>
)

export default Course
