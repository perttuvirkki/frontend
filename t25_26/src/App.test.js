import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TodoTable from "./TodoTable";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders todotable", () => {
  const row = [{ desc: "Go to coffee", date: "24.01.2021" }];
  render(<TodoTable todos={row} />);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
});

test("add & clear todo", () => {
  render(<App />);
  // Add todo
  const desc = screen.getByPlaceholderText("Description");
  fireEvent.change(desc, { target: { value: "Go to coffee" } });
  const date = screen.getByPlaceholderText("Date");
  fireEvent.change(date, { target: { value: "29.01.2021" } });
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText(/go to coffee/i)).toBeInTheDocument();
  // Clear todo
  fireEvent.click(screen.getByText("Clear"));
  expect(screen.queryByText(/go to coffee/i)).not.toBeInTheDocument();
});
