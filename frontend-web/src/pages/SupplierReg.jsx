import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, MenuItem, Select, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Textarea from '@mui/joy/Textarea';

const SupplierReg = () => {

  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [supplierDetails, setSupplierDetails] = useState({
    supplierName: "",
    email: "",
    loction: "",
    contactNumber: "",
    // password: "",
    productList: "",
  });

  function onChange( event) {
    const { name, value } = event.target;
    setSupplierDetails(( prevData ) => ({
      ...prevData,
      [ name ] : value
    }))
  }

  function createNewSupplier( event ) {

    event.preventDefault();
    axios
      .post(`http://localhost:8072/suppler/add`, supplierDetails)
      .then(() => {
        alert('Registered Succefully')
        setSupplierDetails({
          supplierName: "",
          email: "",
          location: "",
          contactNumber: "",
          // password: "",
          productList: "",
        })
      }).catch(( error ) => {
        alert('Ann error occured when registering!!')
        console.log(error);
      })
  }

  return (

        <ThemeProvider theme={defaultTheme}>
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
          Add Suppliers
        </Typography>

        <form onSubmit={createNewSupplier}>
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
                type="email"
                name="email"
                required
                fullWidth
                size="small"
                id="email"
                label="E-mail"
                autoFocus
                onChange={onChange} 
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
                onChange={onChange} 
                value={supplierDetails.loction}               
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
                onChange={onChange} 
                value={supplierDetails.contactNumber}               
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
                onChange={onChange} 
                value={supplierDetails.productList}             
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="warning"
            onClick={() => navigate("/")}
            sx={{ mt: 3, width: '100%' }}
          >
              Cancel Process
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            // disabled={isSubmiting}
            sx={{ mt: 3, width: '100%' }}
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