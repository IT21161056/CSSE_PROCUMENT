/*
(Functional Component pattern.)
Imports are grouped together at the top for better organization.
The component logic is separated into distinct sections: imports, variable declaration, useEffect, rendering, and form submission.
Comments are added to indicate where your input fields should go.
*/

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Box, 
  Button, 
  Grid, 
  TableContainer, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  ThemeProvider, 
  Typography, 
  TableBody 
} from "@mui/material";
import Table from '@mui/material/Table';
import axios from "axios";
import Container from "@mui/material/Container";
import { createTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

// Factory function to create supplier details
const createSupplierDetails = () => ({
  supplierName: "",
  email: "",
  location: "",
  contactNumber: "",
  productList: [],
  orderList: [],
});

  const theme = createTheme({
    palette: {
      primary: { main: "#FFA500" },
      secondary: { main: "#b36b00" },
    },
  });

const UpdateSupplier = () => {

  const { id } = useParams();
  const navigate  = useNavigate();

  const [supplierDetails, setSupplierDetails] = useState(createSupplierDetails ());

  useEffect(() => {
    function fetchSupplierData(){
      axios
        .get(`http://localhost:8072/supplier/singleSupplier/${id}`)
        .then(( response ) => {
          setSupplierDetails(response.data);
        }).catch (( error ) => {
          alert(`An error occured when fetching particular supplier`);
          console.log(error);
        })
    }
    fetchSupplierData();
  }, [id]);

  function updateSupplierData( event ) {
      event.preventDefault();
      axios
        .put('http://localhost:8072/supplier/update/'+id, supplierDetails)
        .then(() => {
          toast.success('Supplier updated successfully!!', {
            position: 'top-center', 
            autoClose: 3000,
          });
          navigate('/dashboard/allSuppliers');
        })
        .catch (( error ) => {
          alert('An error occured  when updating supplier data');
          console.log(error);
        })
  }
  

  function handleChange(event) {
      const { name, value } = event.target;
      setSupplierDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  }

  function handleNestedChange(event, index, field) {
      const { name, value } = event.target;
      setSupplierDetails((prevData) => {
        const newData = { ...prevData };
        newData[field][index][name] = value;
        return newData;
      });
  }

  const renderProductList = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          Product List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplierDetails.productList.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      name={`productList[${index}].name`}
                      required
                      fullWidth
                      size="small"
                      label="Product Name"
                      value={product.name}
                      onChange={(event) => handleNestedChange(event, index, 'productList')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`productList[${index}].price`}
                      required
                      type="number"
                      fullWidth
                      size="small"
                      label="Product Price"
                      value={product.price}
                      onChange={(event) => handleNestedChange(event, index, 'productList')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`productList[${index}].qty`}
                      required
                      fullWidth
                      type="number"
                      size="small"
                      label="Product Quantity"
                      value={product.qty}
                      onChange={(event) => handleNestedChange(event, index, 'productList')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  const renderOrderList = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>
          Order List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Required Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplierDetails.orderList.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      name={`orderList[${index}].product`}
                      required
                      fullWidth
                      size="small"
                      label="Product"
                      value={order.product}
                      onChange={(event) => handleNestedChange(event, index, 'orderList')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`orderList[${index}].quantity`}
                      required
                      fullWidth
                      size="small"
                      label="Quantity"
                      value={order.quantity}
                      onChange={(event) => handleNestedChange(event, index, 'orderList')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`orderList[${index}].requiredDate`}
                      required
                      fullWidth
                      size="small"
                      label="Required Date"
                      value={order.requiredDate}
                      onChange={(event) => handleNestedChange(event, index, 'orderList')}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`orderList[${index}].status`}
                      required
                      fullWidth
                      size="small"
                      label="Status"
                      value={order.status}
                      onChange={(event) => handleNestedChange(event, index, 'orderList')}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: 'whitesmoke',
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: 'white',
              boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              alignItems: "center",
              p: 5,
              mt: 3
            }}
          >
            <Typography variant="h4" mb={4}>
              Update Supplier Details
            </Typography>

            <form onSubmit={updateSupplierData}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="supplierName"
                    required
                    fullWidth
                    size="small"
                    id="supplierName"
                    label="Full-Name"
                    autoFocus
                    onChange={handleChange}
                    value={supplierDetails.supplierName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    label="E-mail"
                    autoFocus
                    onChange={handleChange}
                    value={supplierDetails.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    required
                    fullWidth
                    size="small"
                    id="location"
                    label="Location"
                    autoFocus
                    onChange={handleChange}
                    value={supplierDetails.location}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="contactNumber"
                    required
                    fullWidth
                    label="Contact Number"
                    size="small"
                    id="contactNumber"
                    autoFocus
                    onChange={handleChange}
                    value={supplierDetails.contactNumber}
                  />
                </Grid>

                {renderProductList()}
                {renderOrderList()}
              </Grid>
              <Button
                type="button"
                variant="contained"
                color="warning"
                onClick={() => navigate("/dashboard/allSuppliers")}
                sx={{ m: 3, width: '40%', borderRadius: '1rem', padding: '0.5rem' }}
              >
                Cancel Process
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                sx={{ m: 3, width: '40%', borderRadius: '1rem', padding: '0.5rem' }}
              >
                Update Details
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default UpdateSupplier;