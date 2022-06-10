import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Type all fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            label="firstname"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            label="lastname"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            label="email"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            label="phone"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            label="streetaddress"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            label="postcode"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            label="city"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
