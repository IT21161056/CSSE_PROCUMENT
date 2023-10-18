import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Box, Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import axios from "axios";
import { default as React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/footer";
import Header from "../components/header";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FFA500" },
    secondary: { main: "#FFA500" },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
 const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  // console.log("is signup " +isSignup);

  const MainContainer = styled("div")`
    min-height: 80vh;
    display: grid;
    place-items: center;
  `;
 const handleClick = () => {
    setState((prv) => {
      return {
        ...prv,
        open: true,
      };
    });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  console.log(loginCredentials)

  const login = async (e) => {
    e.preventDefault()
      await axios
      .post(`http://localhost:8072/procument/login`, loginCredentials)
      .then((res) => {
        setLoginCredentials({
          email: "",
          password: "",
        });
     navigate('/dashboard')
      })
      .catch((error) => {
      
      });
  };

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Header />
      <Container  component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Login Successfully!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            // height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginCredentials.email}
              onChange={(e) =>
                setLoginCredentials((p) => {
                  return {
                    ...p,
                    email: e.target.value,
                  };
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginCredentials.pass}
              onChange={(e) =>
                setLoginCredentials((p) => {
                  return {
                    ...p,
                    password: e.target.value,
                  };
                })
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={login}
              color="secondary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item mb={10}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
      <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Login;
