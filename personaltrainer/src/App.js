import "./App.css";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";
import Calendar from "./components/Calendar";
import AddTraining from "./components/AddTraining";
import EditCustomer from "./components/EditCustomer";
import Training from "./components/TrainingList";
import Charts from "./components/Charts";
import { AgGridReact } from "ag-grid-react";
import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  const [tab, setTab] = useState("one");

  const handleChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, margin: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6">Personal Trainer</Typography>
          </Toolbar>{" "}
          <Tabs value={tab} onChange={handleChange}>
            <Tab value="one" label="Customer List" />
            <Tab value="two" label="Training" />
            <Tab value="three" label="Calendar" />
            <Tab value="four" label="Charts" />
          </Tabs>{" "}
        </AppBar>{" "}
      </Box>
      {tab === "one" && <CustomerList />}
      {tab === "two" && <Training />} {tab === "three" && <Calendar />}
      {tab === "four" && <Charts />}{" "}
    </div>
  );
}

export default App;
