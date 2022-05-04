import React, { useState } from "react";
import TodoTable from "./TodoTable";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: "" });
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  };

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        {" "}
        <input
          type="date"
          name="date"
          onChange={inputChanged}
          value={todo.date}
        />
        <input
          type="text"
          name="desc"
          onChange={inputChanged}
          value={todo.desc}
        />
        <input type="submit" value="Add" />
      </form>
      <TodoTable todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoList;
