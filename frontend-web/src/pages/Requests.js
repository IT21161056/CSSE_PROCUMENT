import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Requests = () => {

    const [requestlists, setRequestLists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
   
        function fetchRequestListData() {
        axios
            .get('http://localhost:8072/requestlist/')
            .then(( response ) => {
            console.log(response.data)
            setRequestLists(response.data);
            }).catch(( error ) => {
            alert("An error occures when fecthing request data!!");
            console.log(error);
            });
        }
        fetchRequestListData();
    }, [])

        const filterOrders = requestlists.filter(( item ) => {
        const { rid } = item;
        const lowerCaseQuery = searchQuery.toLowerCase();

        return(
            rid.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const generateReport = (orders) => {
        const doc = new jsPDF();
    

    const columns = [
        {title: 'Request ID', dataKey : 'rid'},
        {title: 'Status', dataKey : 'state'},
    ];

    const data = orders.map (( order ) => ({
        rid: order.rid,
        oid: order.oid,
        state: order.state
    }));

    doc.autoTableSetDefaults({
      startY: 20,
      margin: { top: 20},
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { textColor: 0 },
    });

    doc.autoTable(columns, data);

    doc.save('request_report.pdf');
    };  
  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-start', marginTop: '1rem'}}>
        <Grid item xs={12} sm={6}  sx={{ textAlign: 'center'}}>
            <Typography
                sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                }}
            >
                Order Requests
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}  sx={{ textAlign: 'center'}}>
            <Button
                variant='contained'
                color= 'warning'
                onClick={ () => {
                    generateReport(filterOrders);
                }}
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
                            <TableCell>Request ID</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Total Budget(LKR)</TableCell>
                            <TableCell>Allocated Budget(LKR)</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {filterOrders.map(( item ) => {
                        return(
                        <TableRow key={item._id}>
                            <TableCell>{item.rid}</TableCell>
                            <TableCell>{item.oid}</TableCell>
                            <TableCell>{item.tbudget}</TableCell>
                            <TableCell>{item.abudget}</TableCell>
                            <TableCell>{item.state}</TableCell>
                            <TableCell>
                                <IconButton>
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

export default Requests