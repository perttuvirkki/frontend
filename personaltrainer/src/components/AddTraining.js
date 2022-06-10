import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.customer.links[0].href,
  });

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      date: "",
      activity: "",
      duration: "",
      customer: props.customer.links[0].href,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const addTraining = () => {
    props.saveTraining(training, props.customer.links[0].href);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training</DialogTitle>
        <DialogContent>
          <DialogContentText>Type all fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            label="date"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="activity"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="duration"
            onChange={(e) => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
