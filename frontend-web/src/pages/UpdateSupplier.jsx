import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
import { createTheme } from '@mui/material/styles';

const UpdateSupplier = () => {

  const { id } = useParams();
  const navigate  = useNavigate();

  const [supplierDetails, setSupplierDetails] = useState({
    supplierName: "",
    email: "",
    location: "",
    contactNumber: "",
    productList: ""
  });

  console.log(supplierDetails);

  const theme = createTheme({
  palette: {
    primary: { main: "#FFA500" },
    secondary: { main: "#b36b00" },
  },
  });

  useEffect(() => {
    function fetchSupplierData(){
      axios
        .get(`http:/localhost:8072/supplier/singleSupplier/${id}`)
        .then(( response ) => {
          console.log(response.data);
          setSupplierDetails(response.data);
        }).catch (( error ) => {
          alert(`An error occured when fetching particular suppkier`);
          console.log(error);
        })
    }
    fetchSupplierData();
  }, []);

  function updateSupplierData( event ) {
    event.preventDefault();
    axios
      .put(`http://localhost:8072/supplier/update${id}`, supplierDetails)
      .then(() => {
        alert('Supplier details successfully updated');
        navigate('/dashboard/allSuppliers');
      }).catch (( error ) => {
        alert('An error occured  when updating supplier data');
        console.log(error);
      })
  }

  function onChange( event ){
    const { name, value } = event.target;
    setSupplierDetails(( prevData ) => ({
      ...prevData,
      [name] : value
    }));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "90vh",
      }}
    >
            <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10, pl: 10, pr: 10, pb: 10,
        }}
      >
        <Typography variant="h4" mb={8}>
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
                onChange={onChange} 
                value={supplierDetails.supplierName}               
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
                onChange={onChange} 
                value={supplierDetails.loction}               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="idNumber"
                required
                fullWidth
                size="small"
                id="idNumber"
                label="ID Number"
                autoFocus
                onChange={onChange} 
                value={supplierDetails.idNumber}               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="mobileNumber"
                required
                fullWidth
                size="small"
                id="mobileNumber"
                label="Mobile Number"
                autoFocus
                onChange={onChange} 
                value={supplierDetails.mobileNumber}             
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="date"
                required
                fullWidth
                label="Date"
                size="small"
                id="date"
                autoFocus
                onChange={onChange} 
                value={supplierDetails.mobileNumber}             
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="item"
                required
                fullWidth
                size="small"
                id="item"
                label=""
                autoFocus
                onChange={onChange} 
                value={supplierDetails.items}             
              />
            </Grid>
          </Grid>
        </form> 
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export default UpdateSupplier