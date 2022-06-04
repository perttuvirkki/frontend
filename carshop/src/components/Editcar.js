import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Editcar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    year: "",
    price: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      year: props.car.year,
      price: props.car.price,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <DialogContentText>Type all fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="brand"
            value={car.brand}
            label="Brand"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            label="Model"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            label="Color"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            label="Fuel"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            label="Year"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            label="Price"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
