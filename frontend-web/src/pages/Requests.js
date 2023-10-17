import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import Recommends from "./Recommends";

export default function Requests() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    requestId: "",
    orderId: "",
    description: "",
  });

  useEffect(() => {
    // Fetch orders data when the component mounts
    axios.get("http://localhost:8072/requestlist/").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleOpenModal = (order) => {
    setModalData({
      requestId: order.rid,
      orderId: order.oid,
      description: "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // const handleSaveRecommendation = () => {
  //   // Save the recommendation data to the database and handle the logic here
  //   // Use axios.post to send the data to your backend API
  //   axios
  //     .post("http://localhost:8072/recommend/add", {
  //       requestId: modalData.requestId,
  //       orderId: modalData.orderId,
  //       description: modalData.description,
  //     })
  //     .then((res) => {
  //       // Recommendation saved successfully
  //       console.log(res.data);
  //       // Close the modal
  //       setOpenModal(false);
  //       // You can handle any additional logic here, e.g., displaying a success message
  //     })
  //     .catch((error) => {
  //       // Handle the error, e.g., display an error message
  //       console.error(error);
  //     });
  // };

  const handleSave = () => {
    const dataToSave = {
      requestId: modalData.requestId,
      orderId: modalData.orderId,
      description: modalData.description, 
    };

    // Send a POST request to save the data to the backend
    axios
      .post("http://localhost:8072/recommendsmodel/add", dataToSave)
      .then((response) => {
        // Data has been successfully saved
        console.log("Data saved:", response.data);

        // Open the RecommendationsTable by setting openModal to true
        setOpenModal(true);
      })
      .catch((error) => {
        // Handle any error that occurs while saving the data
        console.error("Error saving data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const { site, rid, oid, tbudget, abudget, state } = order;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      site.toLowerCase().includes(lowerCaseQuery) ||
      rid.toLowerCase().includes(lowerCaseQuery) ||
      oid.toLowerCase().includes(lowerCaseQuery) ||
      tbudget.toString().includes(lowerCaseQuery) ||
      abudget.toString().includes(lowerCaseQuery) ||
      state.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <>
      <Typography variant="h4">Order List</Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Site Name</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Total Budget</TableCell>
              <TableCell>Allocated Budget</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.site}</TableCell>
                <TableCell>{order.rid}</TableCell>
                <TableCell>{order.oid}</TableCell>
                <TableCell>{order.tbudget}</TableCell>
                <TableCell>{order.abudget}</TableCell>
                <TableCell>{order.state}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenModal(order)}>
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
          }}
        >
          <Typography variant="h6">Recommendation Details</Typography>
          <TextField
            label="Request ID"
            name="requestId"
            fullWidth
            value={modalData.requestId}
            disabled
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Order ID"
            name="orderId"
            fullWidth
            value={modalData.orderId}
            disabled
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={modalData.description}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <button onClick={handleSave}>Save Data</button>
          {openModal && <Recommends />}
        </Paper>
      </Modal>
    </>
  );
}
