import React, { useState, useEffect } from "react";
// Import necessary components and styles from MUI
import {
  Button,
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
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Define a functional component for the Popup Box
function PopupBox({ description, onClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}

// Define a styled component for the main container
const StyledContainer = styled("div")`
  // Styles for the container
  height: 100vh;
  width: 100%;
`;

const TopBarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const SubtitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin-left: 200px;
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

// Define the main functional component
export default function Requests() {
  const siteID = useParams();

  // State variables
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    requestId: "",
    orderId: "",
    description: "",
  });
  const [disabledLines, setDisabledLines] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDescription, setPopupDescription] = useState("");

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8072/order/bySiteId/" + siteID.id)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      });
  }, []);

  // Handlers for opening and closing the modal
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

  // Function to refetch the order list
  const reFetchOrderList = () => {
    axios
      .get("http://localhost:8072/order/bySiteId/" + siteID.id)
      .then((res) => {
        setOrders(res.data);
      });
  };

  // Function to save data and update status
  const handleSave = () => {
    const dataToSave = {
      orderId: modalData.orderId,
      description: modalData.description,
    };

    // Send a POST request to save the data to the backend
    axios
      .post("http://localhost:8072/recommendsmodel/add", dataToSave)
      .then((response) => {
        console.log("Data saved:", response.data);

        setOpenModal(true);
      })
      .catch((error) => {
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
  const filteredOrders = orders.filter((order) => {
    const { status } = order;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return status.toLowerCase().includes(lowerCaseQuery);
  });

  // Function to approve an order
  const approveOrder = async (order) => {
    await axios
      .put("http://localhost:8072/order/updateStatus", {
        id: order._id,
        status: "approved",
      })
      .then((res) => {
        reFetchOrderList();
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .put("http://localhost:8072/site/updateBudget", {
        siteid: order.site._id,
        allocatedBudget: Number(order.totalPrice),
      })
      .then((res) => {
        reFetchOrderList();
      });
  };

  // Function to open the popup and set the description
  const openPopup = (description) => {
    setPopupDescription(description);
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupDescription("");
  };

  return (
    <StyledContainer>
      <TopBarContainer>
        <Typography variant="h2">Order List</Typography>
      </TopBarContainer>

      <SubtitleContainer>
        <Card
          sx={{ border: "0 solid #FF8000", width: "25%", borderRadius: "40px" }}
        >
          <CardContent
            sx={{
              border: "3px solid #FF8000",
              width: "86%",
              borderRadius: "40px",
            }}
          >
            <Typography variant="h6">
              Site Name: {orders.length > 0 ? orders[0].site.siteName : ""}
            </Typography>
          </CardContent>
        </Card>
      </SubtitleContainer>

      <TextField
        label="Search"
        variant="outlined"
        color="warning"
        focused
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{
          width: "25%",
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 20,
          "&:hover": {
            "& fieldset": {
              borderColor: "#ff4d4f", // Change to your warning color
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="warning"
        size="large"
        href="/dashboard/reportlist" // Add the link to your dashboard/report list
        startIcon={<ArrowBackIcon />} // Add a back arrow icon
        sx={{
          width: "25%",
          height: "60px",
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 42,
        }}
      >
        Back to Order Reports
      </Button>

      <TableContainer component={Paper} sx={{ width: "75%", margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#FF8000", color: "#fff" }}>
                Request ID
              </TableCell>
              <TableCell sx={{ backgroundColor: "#FF8000", color: "#fff" }}>
                Total Budget
              </TableCell>
              <TableCell sx={{ backgroundColor: "#FF8000", color: "#fff" }}>
                Allocated Budget
              </TableCell>
              <TableCell sx={{ backgroundColor: "#FF8000", color: "#fff" }}>
                Status
              </TableCell>
              <TableCell sx={{ backgroundColor: "#FF8000", color: "#fff" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>S{order._id.slice(0, 4)}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.site.allocatedBudget}</TableCell>
                <TableCell>
                  <StatusTag
                    color={`${order.status}`}
                    onClick={() => {
                      if (order.status === "declined") {
                        openPopup(order.description);
                      }
                    }}
                  >
                    {order.status}
                  </StatusTag>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => approveOrder(order)}
                    sx={{
                      color: "#FF8000",
                      marginRight: 1,
                      width: "40px",
                      textTransform: "unset",
                    }}
                    disabled={
                      order.status === "approved" || order.status === "declined"
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleOpenModal(order)}
                    size="small"
                    variant="contained"
                    color="error"
                    sx={{
                      color: "#fff",
                      textTransform: "unset",
                    }}
                    disabled={
                      order.status === "approved" || order.status === "declined"
                    }
                  >
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
