import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography, Link } from '@mui/material'
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

const SupplierList = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const suppliersArray  = suppliers;
    console.log(suppliersArray);

    useEffect(() => {
   
        function fetchSupplierData() {
        axios
            .get('http://localhost:8072/supplier/all')
            .then(( response ) => {
            console.log(response.data)
            setSuppliers(response.data);
            }).catch(( error ) => {
            alert("An error occures when fecthing supplier data!!");
            console.log(error);
            });
        }
        fetchSupplierData();
    }, [])

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


  return (
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

        <TableContainer sx={{ 
                              maxHeight: '70vh', 
                              padding: 1, 
                              margin: '1rem',
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}
        >
                <Table>
                    <TableHead sx={{backgroundColor: '#FF9933'}}>
                        <TableRow>
                            <TableCell>Supplier Name</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Orders</TableCell>
                            <TableCell>Action</TableCell>
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
                            <TableCell><Button/></TableCell>
                            {/* <TableCell>
                                <Button>
                                    View More
                                </Button>
                            </TableCell> */}
                            <TableCell>
                                <IconButton sx={{ backgroundColor: "primary" }}>
                                    <Link
                                        to={`/dashboard/updateSupplier/${item._id}`}
                                        state={{ orderData: item }}
                                    ></Link>
                                    <EditNoteIcon/>
                                </IconButton>
                                <IconButton>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        );
                    })}

                    </TableBody>
                </Table>
        </TableContainer>
    </Grid>
  );
}

export default SupplierList