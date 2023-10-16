import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, MenuItem, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Textarea from '@mui/joy/Textarea';
import { createTheme } from '@mui/material/styles';

const SupplierReg = () => {

  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const theme = createTheme({
    palette: {
      primary: { main: "#FFA500" },
      secondary: { main: "#b36b00" },
    },
  });

  const [supplierDetails, setSupplierDetails] = useState({
    supplierName: "",
    email: "",
    loction: "",
    contactNumber: "",
    // password: "",
    addedDate: "",
    productList: "",
  });

  console.log(supplierDetails);

  function onChange( event) {
    const { name, value } = event.target;
    setSupplierDetails(( prevData ) => ({
      ...prevData,
      [ name ] : value
    }))
  }

  const handleSubmit = async ( event ) => {
    event?.preventDefault();
    setIsSubmiting(true);
    axios
      .post(`http://localhost:8072/supplier/add`, supplierDetails)
      .then(() => {
        alert('Registered Succefully')
        setSupplierDetails({
          supplierName: "",
          email: "",
          location: "",
          contactNumber: "",
          // password: "",
          addedDate:"",
          productList: "",
        })
      }).catch(( error ) => {
        if ( error.response) {
          console.log("Server responded with status code: " + error.response.status);
          console.log("Response data:", error.response.data);        
        }else if (error.request ) {
          console.log("No response received. The request was made.");
        } else {
          console.log("Error setting up the request:", error.message);
        }

      })
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
          backgroundColor: '#FEFEFE',
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 15,
          borderColor: '#ED960B',
          borderWidth: '1rem',
          pt: 10, pl: 10, pr: 10, pb: 10,
        }}
      >
        <Typography variant="h4" mb={8}>
          Add Suppliers
        </Typography>

        <form onSubmit={handleSubmit}>
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
                onChange={ ( event ) => {
                  setSupplierDetails( event.target.value);
                }}     
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                name="email"
                required
                fullWidth
                size="small"
                id="email"
                label="E-mail"
                autoFocus
                onChange={ ( event ) => {
                  setSupplierDetails( event.target.value );
                }}            
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
                onChange={ ( event ) => {
                  setSupplierDetails( event.target.value );
                }}             
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactNumber"
                required
                fullWidth
                size="small"
                id="contactNumber"
                label="Contact Number"
                autoFocus
                onChange={ ( event ) => {
                  setSupplierDetails( event.target.value );
                }}            
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="productList"
                required
                fullWidth
                size="small"
                id="productList"
                label="Add Products"
                autoFocus
                onChange={ ( event ) => {
                  setSupplierDetails( event.target.value );
                }}            
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="warning"
            onClick={() => navigate("/")}
            sx={{ mt: 3, width: '50%', borderRadius: '1rem', padding:'0.5rem'}}
          >
              Cancel Process
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            // disabled={isSubmiting}
            sx={{ mt: 3, width: '50%', borderRadius: '1rem', padding:'0.5rem' }}
          >
            Add Supplier
          </Button>          
        </form> 
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export default SupplierReg