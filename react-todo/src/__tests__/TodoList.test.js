// src/TodoList.test.js

import { render, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders TodoList component", () => {
  const { getByText } = render(<TodoList />);
  expect(getByText("Todo List")).toBeInTheDocument();
});

test("adds a new todo", () => {
  const { getByPlaceholderText, getByText } = render(<TodoList />);
  const input = getByPlaceholderText("Add a new todo");
  const addButton = getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(addButton);

  expect(getByText("New Todo")).toBeInTheDocument();
});

test("toggles todo completion", () => {
  const { getByText } = render(<TodoList />);
  const todoText = getByText("Learn React");

  fireEvent.click(todoText);
  expect(todoText).toHaveStyle("text-decoration: line-through");

  fireEvent.click(todoText);
  expect(todoText).toHaveStyle("text-decoration: none");
});

test("deletes a todo", () => {
  const { getByText, queryByText } = render(<TodoList />);
  const deleteButton = getByText("Delete");

  fireEvent.click(deleteButton);
  expect(queryByText("Learn React")).not.toBeInTheDocument();
});
