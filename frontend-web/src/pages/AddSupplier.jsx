import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Button, 
  Grid, 
  TextField, 
  ThemeProvider, 
  Typography 
} from "@mui/material";
import axios from "axios";
import Container from "@mui/material/Container";
import { createTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify';

// Factory function for creating supplierDetails objects
function createSupplierDetails(supplierName = "", email = "", location = "", contactNumber = "", productList = [{ name: "", price: "", qty: "" }]) {
  return {
    supplierName,
    email,
    location,
    contactNumber,
    productList,
  };
}

const AddSupplier = () => {
  const navigate = useNavigate();
 
  const [supplierDetails, setSupplierDetails] = useState(createSupplierDetails());
  const [isSubmiting, setIsSubmiting] = useState(false);
  
  function handleProductChange (event, index) {
    const { name, value } = event.target;
    setSupplierDetails((prevData) => {
      const updatedProducts = [...prevData.productList];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      return { ...prevData, productList: updatedProducts };
    });
  }
  
  function addProductField() {
    setSupplierDetails((prevData) => ({
      ...prevData,
      productList: [...prevData.productList, { name: "", price: "", qty: "" }],
    }));
  }

  const handleSubmit = async ( event ) => {
    // event?.preventDefault();
    setIsSubmiting(true);
    axios
      .post(`http://localhost:8072/supplier/add`, supplierDetails)
      .then(() => {
        toast.success('Supplier added successfully!!', {
          position: 'top-center', 
          autoClose: 3000,
        });
        setSupplierDetails(createSupplierDetails());
      }).catch(( error ) => {
        if ( error.response) {
          console.log("Server responded with status code: " + error.response.status);
          console.log("Response data:", error.response.data);        
        }else if (error.request ) {
          console.log("No response received. The request was made.");
        } else {
          console.log("Error setting up the request:", error.message);
        }

      });
    }

  const theme = createTheme({
    palette: {
      primary: { main: "#FFA500" },
      secondary: { main: "#b36b00" },
    },
  });

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
                backgroundColor: 'white',
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                flexDirection: "column",
                alignItems: "center",
                p: 5,
              }}
            >
              <Typography variant="h4" mb={4}>
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
                      onChange={( event ) => 
                        setSupplierDetails(( prev ) => ({
                          ...prev,
                          supplierName: event.target.value
                        }))
                      }
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
                      onChange={( event ) => 
                        setSupplierDetails(( prev ) => ({
                          ...prev,
                          email: event.target.value
                        }))
                      }        
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
                      onChange={( event ) => 
                        setSupplierDetails(( prev ) => ({
                          ...prev,
                          location: event.target.value
                        }))
                      }            
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
                      inputProps={{
                        pattern: "[0-9]{10}",
                      }}
                      onChange={( event ) => 
                        setSupplierDetails(( prev ) => ({
                          ...prev,
                          contactNumber: event.target.value
                        }))
                      }       
                    />
                  </Grid>
                  <Grid item xs={12}>          
                    {supplierDetails.productList.map((product, index) => (
                      <div key={index}>
                        <TextField
                        sx={{mb: 1, mt: 1}}
                          name="name"
                          required
                          fullWidth
                          size="small"
                          label="Product Name"
                          value={product.name}
                          onChange={(event) => handleProductChange(event, index)}
                        />
                        <TextField
                        sx={{mb: 1, mt: 1}}
                          type="number"
                          name="price"
                          required
                          fullWidth
                          size="small"
                          label="Product Price"
                          value={product.price}
                          onChange={(event) => handleProductChange(event, index)}
                        />
                        <TextField
                          type="number"
                          name="qty"
                          required
                          fullWidth
                          size="small"
                          label="Product quantity"
                          value={product.qty}
                          onChange={(event) => handleProductChange(event, index)}
                        />
                      </div>
                    ))}

                    <IconButton
                      color="white"             
                      onClick={addProductField}
                      sx={{ mt: 2, backgroundColor: 'orange'}}
                    >
                      <AddIcon />
                    </IconButton>

                  </Grid>
                </Grid>
                <Button
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/dashboard")}
                  sx={{ mt: 3, mr: '8rem', width: '40%', borderRadius: '1rem', padding:'0.5rem'}}
                >
                    Cancel Process
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  // disabled={isSubmiting}
                  sx={{ mt: 3, width: '40%', borderRadius: '1rem', padding:'0.5rem' }}
                >
                  Add Supplier
                </Button>          
              </form> 
      </Box>
    </Container>
    </Box>
    </ThemeProvider>
  )
}

export default AddSupplier