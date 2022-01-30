// Basic
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles, Images and UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import QRCode from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";

// API
import api from "../../services/api";

// Init
const hash = uuidv4();

const Login = () => {
  // Navigation
  const navigate = useNavigate();

  // States
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Methods
  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  async function handleFormSubmit(event) {
    event.preventDefault();

    // Loading
    setLoading(true);

    api
      .post(
        "/login",
        { login, password, hash },
        { "Content-Type": "application/json" }
      )
      .then(({ data }) => {
        if (data.success === true) {
          localStorage.setItem(process.env.REACT_APP_STORAGE_KEY, data.token);
          navigate("/dashboard");
        } else {
          setLoading(false);
        }
      })
      .catch(async (e) => {
        setLoading(false);
        // await Alert("Login ou senha incorretos.", "Ops...");
      });
  }

  return (
    <div id="page-login">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Autenticação
          </Typography>
          <QRCode
            value={hash}
            size={256}
            fgColor={"#820AD1"}
            includeMargin={true}
          />
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="document"
              label="CPF"
              name="document"
              autoComplete="document"
              autoFocus
              value={login}
              onChange={handleLogin}
              inputProps={{ autoComplete: "chrome-off" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
              inputProps={{ autoComplete: "chrome-off" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Entrar"}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
