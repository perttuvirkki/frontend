import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);

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
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars));
  };

  const deleteCar = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.log(err));
      handleClick();
    }
  };

  const saveCar = (car) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.log(err));
  };

  const columns = [
    { Header: "Brand", accessor: "brand" },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Fuel",
      accessor: "fuel",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      sortable: false,
      filterable: false,
      accessor: "_links.self.href",
      Cell: (row) => <Editcar updateCar={updateCar} car={row.original} />,
    },
    {
      sortable: false,
      filterable: false,
      accessor: "_links.self.href",
      Cell: (row) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteCar(row.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Addcar saveCar={saveCar} />

      <ReactTable filterable={true} data={cars} columns={columns} />
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
