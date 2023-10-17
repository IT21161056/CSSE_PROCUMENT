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
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled("div")`
  height: 100vh;
  width: 100%;
`;

const TopBarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const StatusTag = styled("div")`
  width: 70px;
  text-align: center;
  color: ${(props) =>
    props.color == "declined"
      ? "#ff4d4f"
      : props.color == "waiting"
      ? "#faad14"
      : "#52c41a"};
  padding: 2px 4px;

  border-radius: 4px;
  background-color: ${(props) =>
    props.color == "declined"
      ? "#fff2f0"
      : props.color == "waiting"
      ? "#fffbe6"
      : "#f6ffed"};

  border-color: ${(props) =>
    props.color == "declined"
      ? "#ff4d4f"
      : props.color == "waiting"
      ? "#faad14"
      : "#52c41a"};
  border-width: 1px;
  border-style: solid;
`;

export default function Requests() {
  const siteID = useParams();

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
    axios
      .get("http://localhost:8072/order/bySiteId/" + siteID.id)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      });
  }, []);

  const handleOpenModal = (order) => {
    setModalData({
      orderId: order._id,
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

  const reFetchOrderList = () => {
    axios
      .get("http://localhost:8072/order/bySiteId/" + siteID.id)
      .then((res) => {
        setOrders(res.data);
      });
  };

  const handleSave = () => {
    const dataToSave = {
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
    console.log("update status");
    axios
      .put("http://localhost:8072/order/updateStatus", {
        id: modalData.orderId,
        status: "declined",
      })
      .then((res) => {
        reFetchOrderList();
        setModalData({ requestId: "", orderId: "", description: "" });
        openModal(true);
      })
      .catch((err) => {
        console.log(err);
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
  // const filteredOrders = orders.filter((order) => {
  //   const { site, rid, oid, tbudget, abudget, state } = order;
  //   const lowerCaseQuery = searchQuery.toLowerCase();

  //   return (
  //     site.toLowerCase().includes(lowerCaseQuery) ||
  //     rid.toLowerCase().includes(lowerCaseQuery) ||
  //     oid.toLowerCase().includes(lowerCaseQuery) ||
  //     tbudget.toString().includes(lowerCaseQuery) ||
  //     abudget.toString().includes(lowerCaseQuery) ||
  //     state.toLowerCase().includes(lowerCaseQuery)
  //   );
  // });

  const approveOrder = (orderID) => {
    axios
      .put("http://localhost:8072/order/updateStatus", {
        id: orderID,
        status: "approved",
      })
      .then((res) => {
        reFetchOrderList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledContainer>
      <TopBarContainer>
        <Typography variant="h4">Order List</Typography>
        <Button variant="contained">Rejected orders</Button>
      </TopBarContainer>

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
              <TableCell>Total Budget</TableCell>
              <TableCell>Allocated Budget</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.site.siteName}</TableCell>
                <TableCell>S{order._id.slice(0, 4)}</TableCell>

                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.site.allocatedBudget}</TableCell>
                <TableCell>
                  <StatusTag color={`${order.status}`}>
                    {order.status}
                  </StatusTag>
                </TableCell>
                <TableCell>
                  <Button onClick={() => approveOrder(order._id)}>
                    Approve
                  </Button>
                  <Button onClick={() => handleOpenModal(order)}>
                    Decline
                  </Button>
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
            sx={{ marginBottom: 2 }}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save Data</button>
        </Paper>
      </Modal>
    </StyledContainer>
  );
}
