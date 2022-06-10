import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

export default function Training() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchTrainings())
        .catch((err) => console.log(err));
      handleClick();
    }
  };

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "date",
      valueFormatter: (data) => dayjs(data.value).format("DD/MM/YYYY"),
    },
    { field: "duration" },
    { field: "activity" },
    { field: "id" },
    { field: "customer.firstname" },
    {
      sortable: false,
      filter: false,
      headerName: "",
      field: "id",
      cellRenderer: (row) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteTraining(row.data.id)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }), []);
  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
