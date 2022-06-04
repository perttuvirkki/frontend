import logo from "./logo.svg";
import "./App.css";
import Carlist from "./components/Carlist";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, margin: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">News</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Carlist />
    </div>
  );
}

export default App;
