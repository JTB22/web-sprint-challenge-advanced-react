// Write your tests here
import React from "react";
import AppFunctional from "./AppFunctional";
import AppClass from "./AppClass";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
  reset = document.querySelector("#reset");
  submit = document.querySelector("#submit");
};

const updateStatefulSelectors = (document) => {
  squares = document.querySelectorAll(".square");
  coordinates = document.querySelector("#coordinates");
  steps = document.querySelector("#steps");
  message = document.querySelector("#message");
  email = document.querySelector("#email");
};

test("renders stateless AppFunctional", async () => {
  const { container } = render(<AppFunctional />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test("renders stateful AppClass", async () => {
  const { container } = render(<AppClass />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(squares.length).toBe(9);
});

test("renders stateless AppFunctional and clicks on the buttons", async () => {
  const { container } = render(<AppFunctional />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

  fireEvent.click(up);
  fireEvent.click(down);
  fireEvent.click(left);
  fireEvent.click(right);
  fireEvent.click(reset);
  fireEvent.click(submit);
});

test("renders AppClass and clicks on the buttons", async () => {
  const { container } = render(<AppClass />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(squares.length).toBe(9);
});

test("renders AppFunctional and clicks on the buttons", async () => {
  const { container } = render(<AppFunctional />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

  fireEvent.click(up);
  expect(coordinates).toContainHTML("2, 1");
  fireEvent.click(down);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(left);
  expect(coordinates).toContainHTML("1, 2");
  fireEvent.click(right);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(reset);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(submit);
});

test("renders AppClass and clicks on the buttons", async () => {
  const { container } = render(<AppClass />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(squares.length).toBe(9);

  fireEvent.click(up);
  expect(coordinates).toContainHTML("2, 1");
  fireEvent.click(down);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(left);
  expect(coordinates).toContainHTML("1, 2");
  fireEvent.click(right);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(reset);
  expect(coordinates).toContainHTML("2, 2");
  fireEvent.click(submit);
});

test("type email and submit on bot AppFunctional and AppClass", async () => {
  const { container } = render(<AppFunctional />);
  updateStatelessSelectors(container);
  updateStatefulSelectors(container);

  fireEvent.change(email, { target: { value: "22@joshblood.com" } });
  fireEvent.click(submit);
});
