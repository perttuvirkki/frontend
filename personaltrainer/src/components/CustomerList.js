import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./AddCustomer";

export default function CustomerList(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = <React.Fragment></React.Fragment>;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData.content));
  };

  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.log(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => fetchCustomers())
        .catch((err) => console.log(err));
      handleClick();
    }
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.log(err));
  };

  const saveTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    }).catch((err) => console.log(err));
  };

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstname" },
    { field: "lastname" },
    { field: "streetaddress" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" },
    {
      sortable: false,
      filter: false,
      headerName: "",
      cellRenderer: (row) => (
        <AddTraining saveTraining={saveTraining} customer={row.data} />
      ),
    },
    {
      sortable: false,
      filter: false,
      headerName: "",
      field: "links.0.href",
      cellRenderer: (row) => (
        <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
      ),
    },
    {
      sortable: false,
      filter: false,
      headerName: "",
      field: "links.0.href",
      cellRenderer: (row) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteCustomer(row.value)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }), []);
  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AddCustomer saveCustomer={saveCustomer} />
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="DELETE CONFIRMED"
        action={action}
      />
    </div>
  );
}
