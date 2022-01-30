// Basic
import React from "react";

// Toast and styles
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Routes
import RouteCfg from "./routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#820AD1",
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouteCfg />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
