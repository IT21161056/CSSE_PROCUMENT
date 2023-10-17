import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
  };

  const resetState = () => {
    setIsSignup(!isSignup);
    setInput({ name: "", email: "", password: "" });
  };

  // console.log("is signup " +isSignup);

  const MainContainer = styled("div")`
    min-height: 80vh;
    display: grid;
    place-items: center;
  `;

  return (
    <div>
      <Header />
      <MainContainer>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            minWidth={400}
            alignItems="center"
            justifyContent="center"
            margin="auto"
            marginTop={5}
            marginBottom={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px 5px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography variant="h3" padding={3} textAlign="center">
              {isSignup ? "Signup" : "Login"}
            </Typography>

            {isSignup && (
              <TextField
                onChange={handleChange}
                value={input.name}
                name="name"
                margin="normal"
                type={"text"}
                variant="outlined"
                placeholder="Name"
              />
            )}
            <TextField
              onChange={handleChange}
              value={input.email}
              name="email"
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="Email"
            />
            <TextField
              onChange={handleChange}
              value={input.password}
              name="password"
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Password"
            />

            <Button
              endIcon={
                isSignup ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />
              }
              type="submit"
              sx={{ marginTop: 3, borderRadius: 3 }}
              variant="contained"
              color="warning"
              onClick={() => navigate("/dashboard")}
            >
              {isSignup ? "Signup" : "Login"}
            </Button>

            <Button
              endIcon={
                isSignup ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />
              }
              onClick={resetState}
              sx={{ marginTop: 3, borderRadius: 3 }}
            >
              Change to {isSignup ? "Login" : "Signup"}
            </Button>
          </Box>
        </form>
      </MainContainer>
      <Footer />
    </div>
  );
};

export default Login;
