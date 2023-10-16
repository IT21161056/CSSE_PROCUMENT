import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {saveAs} from 'file-saver';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const SupplierList = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedSupplierProduct, setSelectedSupplierProduct] = useState(null); 
    const [selectedSupplierOrder, setSelectedSupplierOrder] = useState(null); 

    const suppliersArray  = suppliers;
    console.log(suppliersArray);

    const openModalProduct = (productList) => {
        setSelectedSupplierProduct(productList);
        console.log(productList);
    };
    
    const closeModalProduct = () => {
        setSelectedSupplierProduct(null);
    };

    const openModalOrder = (orderList) => {
        setSelectedSupplierOrder(orderList);
        console.log(orderList);
    };

    const closeModalOrder = () => {
        setSelectedSupplierOrder(null);
    };

    useEffect(() => {
   
        function fetchSupplierData() {
        axios
            .get('http://localhost:8072/supplier/all')
            .then(( response ) => {
                setIsLoading(false);
                console.log(response.data)
                setSuppliers(response.data);
            }).catch(( error ) => {
            alert("An error occures when fecthing supplier data!!");
            console.log(error);
            });
        }
        fetchSupplierData();
    }, [])

    const deleteSupplier = async ( supplierId ) => {
        axios
        .delete(`http://localhost:8072/supplier/deleteSupplier/${supplierId}`)
        .then(() => {
            setIsLoading(false);
            const newSupplier =  suppliers.filter(( item ) => item._id != supplierId);
            setSuppliers(newSupplier);
            alert("Supplier deleted successfully!!");
        }).catch(( error ) => {
            console.log(`deletion supplie Id ${supplierId}`);
            alert( error );
        });
    }

    const filterSuppliers = suppliers.filter(( item ) => {
        const { supplierName, email } = item;
        const lowerCaseQuery = searchQuery.toLowerCase();

        return(
            supplierName && supplierName.toLowerCase().includes(lowerCaseQuery) ||
            email && email.toLowerCase().includes(lowerCaseQuery)
        );
    });

    function createAndDownLoadPdf(){
        axios.post('http://localhost:8072/orders_pdf/create-pdf', suppliersArray)
        .then(() => axios.get('http://localhost:8072/orders_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'Suppllier Report.pdf')
        })
    }

    const renderProductTable = () => {
        if (selectedSupplierProduct) {
        return (
            <Dialog open={Boolean(selectedSupplierProduct)} onClose={closeModalProduct}>
            <DialogContent>
                <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: '#FFA500'}}>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {selectedSupplierProduct.map(( product, index) => (
                        <TableRow key={ index }>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.qty}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </DialogContent>
            </Dialog>
        );
    }
    }

    const renderOrderTable = () => {
    if (selectedSupplierOrder) {
        return (
            <Dialog open={Boolean(selectedSupplierOrder)} onClose={closeModalOrder}>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead sx={{backgroundColor: '#FFA500'}}>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Site</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Required Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedSupplierOrder.map(( order, index ) => (
                    <TableRow key={ index }>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.site.siteName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.requiredDate}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      );
    }
  };


  return (
    <>
    <Grid container spacing={2} sx={{ alignItems: 'flex-start', marginTop: '1rem'}}>
        <Grid item xs={12} sm={6}  sx={{ textAlign: 'center'}}>
            <Typography
                sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                }}
            >
                Manage Suppliers
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}  sx={{ textAlign: 'center'}}>
            <Button
                variant='contained'
                color= 'warning'
                onClick ={createAndDownLoadPdf}
            >
                Generate Report
            </Button>
        </Grid>
        
            <TextField
                label= 'Search'
                variant='outlined'
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                    width: '50%',
                    marginTop: '2rem',
                    marginRight: '2rem',
                    marginLeft: '2rem',
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />
            
        </Grid>
        <TableContainer sx={{ maxHeight: '70vh', paddingRight: 1, paddingLeft: 1, marginTop: 1}}>
                <Paper sx={{ width: '100%'}}>
                <Table>
                    <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#FFA500' }}>
                        <TableRow>
                            <TableCell sx={{minWidth: 150}}>Supplier Name</TableCell>
                            <TableCell sx={{minWidth: 150}}>E-mail</TableCell>
                            <TableCell sx={{minWidth: 150}}>Location</TableCell>
                            <TableCell sx={{minWidth: 130}}>Contact Number</TableCell>
                            <TableCell sx={{minWidth: 80}}>Products</TableCell>
                            <TableCell sx={{minWidth: 80}}>Orders</TableCell>
                            <TableCell sx={{minWidth: 60}}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {filterSuppliers.map(( item ) => {
                        return(
                        <TableRow key={item._id}>
                            <TableCell>{item.supplierName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.contactNumber}</TableCell>
                            <TableCell>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    color='warning'
                                    onClick={() => openModalProduct(item.productList)}
                                >
                                    View More
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    color='warning'
                                    onClick={() => openModalOrder(item.orderList)}
                                >
                                    View More
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton>
                                    <Link    
                                        to={`/dashboard/updateSupplier/${item._id}`}
                                        state={{ supplierData: item }}
                                    >
                                        <EditNoteIcon/>
                                    </Link>
                                </IconButton>
                                <IconButton
                                    color='error'
                                    children={<DeleteForeverIcon/>}
                                    onClick={() => deleteSupplier(item._id)}
                                >                      
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        );
                    })}

                    </TableBody>
                </Table>
            </Paper>
        </TableContainer>
    <Grid/>
    {renderProductTable()}
    {renderOrderTable()}
    </>
  );
}

export default SupplierList