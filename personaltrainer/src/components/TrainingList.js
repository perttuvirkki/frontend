import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function Training() {
  const [open, setOpen] = useState(false);

  const action = <React.Fragment></React.Fragment>;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
    <div
      className="ag-theme-alpine"
      style={{ height: 500, width: "80%", margin: "auto" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={"Training deleted"}
        action={action}
      />
    </div>
  );
}
