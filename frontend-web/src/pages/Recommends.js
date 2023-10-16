import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const defaultTheme = createTheme();

const Recommends = () => {
  const navigate = useNavigate();
  const [inputdata, setInputData] = useState({
    requestId: "",
    orderId: "",
    description: "",
  });
  const [requestIderror, setRequestIderror] = useState("");
  const [orderIderror, setOrderIdError] = useState("");
  const [descriptionerror, setDescriptionError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommendations data when the component mounts
    axios
      .get("http://localhost:8072/recommend") // Replace with the actual endpoint for fetching recommendations
      .then((response) => {
        const data = response.data;
        setRecommendations(data); // Set the recommendations data in the state
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, []);

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8072/recommend/add", {
        requestId: inputdata.requestId,
        orderId: inputdata.orderId,
        description: inputdata.description,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const SubmitRecommendData = async (e) => {
    e.preventDefault();
    if (!inputdata.requestId || !inputdata.requestId.length) {
      setRequestIderror("Request ID is required");
      return false;
    } else {
      setRequestIderror("");
    }
    if (!inputdata.orderId || !inputdata.orderId.length) {
      setOrderIdError("Order ID is required");
      return false;
    } else {
      setOrderIdError("");
    }
    if (!inputdata.description || !inputdata.description.length) {
      setDescriptionError("Description is required");
      return false;
    } else {
      sendRequest()
        .then(() => navigate("/dashboard/manageMenu"))
        .then(() => toast.success("Successfully added the recommendation"));
    }
    return true;
  };

  return (
    <div>
      <center>
        <Topic>Recommended Changes</Topic>
      </center>

      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ border: "2px solid #FF9933", borderRadius: "20px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <label htmlFor="requestId">Request ID</label>
              <TextField
                margin="normal"
                required
                fullWidth
                id="requestId"
                label="Request ID"
                name="requestId"
                autoComplete="requestId"
                autoFocus
                color="warning"
                error={requestIderror && requestIderror.length ? true : false}
                helperText={
                  inputdata.requestId ? !inputdata.requestId : requestIderror
                }
                value={inputdata.requestId}
                onChange={setInputValue}
              />
              <label htmlFor="orderId">Order ID</label>
              <TextField
                margin="normal"
                required
                fullWidth
                id="orderId"
                label="Order ID"
                name="orderId"
                autoComplete="orderId"
                color="warning"
                error={orderIderror && orderIderror.length ? true : false}
                helperText={
                  inputdata.orderId ? !inputdata.orderId : orderIderror
                }
                value={inputdata.orderId}
                onChange={setInputValue}
              />
              <label htmlFor="description">Description</label>
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="textarea"
                id="description"
                autoComplete="description"
                color="warning"
                multiline
                rows={5}
                error={
                  descriptionerror && descriptionerror.length ? true : false
                }
                helperText={
                  inputdata.description
                    ? !inputdata.description
                    : descriptionerror
                }
                value={inputdata.description}
                onChange={setInputValue}
              />
              <Button
                onClick={SubmitRecommendData}
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      {/* Table for recommendations */}
      <TableContainer
        component={Box}
        sx={{ border: "2px solid #FF9933", borderRadius: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendations.map((recommendation, index) => (
              <TableRow key={index}>
                <TableCell>{recommendation.requestId}</TableCell>
                <TableCell>{recommendation.orderId}</TableCell>
                <TableCell>{recommendation.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const Topic = styled.div`
  font-family: "Red Hat Display", sans-serif;
  font-size: 40px;
  font-weight: 1000;
  line-height: 85px;
  letter-spacing: 0em;
  text-align: center;
  color: #000;
  position: center;
`;

export default Recommends;
