import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  {
    id: "requestId",
    label: "Request ID",
  },
  {
    id: "orderId",
    label: "Order ID",
  },
  {
    id: "description",
    label: "Description",
  },
];

const Recommends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(0);
  const [deliveryGuys, setDeliveryGuys] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [assignedDvPerson, setDvPerson] = useState("");
  const [open, setOpen] = React.useState(false);
  const [delivery, setDelivery] = useState({
    id: "",
  });
  const [deliveryStatus, setDeliveryStatus] = useState();
  const [deliveryStatusData, setDeliveryStatusData] = useState([]);

  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setDeliveryStatus("");
  };

  const getOrderId = (order) => {
    setOpen(true);
    setDelivery({
      id: order._id,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8072/recommendsmodel/")
      .then((res) => {
        setIsLoading(false);
        setDeliveries(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refetch = () => {
    axios
      .get("http://localhost:8072/recommendsmodel/")
      .then((res) => {
        setIsLoading(false);
        setDeliveries(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatus = (event) => {
    event?.preventDefault();
    console.log(deliveryStatus);
    const data = {
      state: deliveryStatus,
    };
    axios
      .post("http://localhost:8072/recommendsmodel/add/" + delivery.id, data)
      .then((res) => {
        refetch();
        setIsLoading(false);
        setOpen(false);
        setDeliveryStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TableContainer sx={{ maxHeight: "60vh", padding: 1 }}>
      <Typography mb={2} sx={{ fontWeight: 600, fontSize: 20, color: "black" }}>
        Rejected Orders
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column?.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell>{row.requestId}</TableCell>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => getOrderId(row)}>
                        <SettingsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default Recommends;
