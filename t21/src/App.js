import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

function TodoList() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  const deleteTodos = () => {
    setTodos([]);
  };

  const columns = [
    {
      headerName: "Date",
      field: "date",
    },
    {
      headerName: "Description",
      field: "description",
    },
    {
      headerName: "Priority",
      field: "priority",
    },
  ];

  const gridOptions = {
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    animateRows: true,
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="date"
          onChange={inputChanged}
          placeholder="date"
          name="date"
          value={todo.date}
        />
        <input
          type="text"
          onChange={inputChanged}
          placeholder="description"
          name="description"
          value={todo.description}
        />
        <input
          type="text"
          onChange={inputChanged}
          placeholder="priority"
          name="priority"
          value={todo.priority}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodos}>Clear</button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: 700, width: "50%", margin: "auto" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={todos}
          gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default TodoList;
