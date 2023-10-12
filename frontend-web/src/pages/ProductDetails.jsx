import React, { useEffect } from 'react'
import axios from 'axios';
import { Button, Card, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ProductDetails () {

  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-start', marginTop: '1rem'}}>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'center'}}>
            <Typography
                sx={{
                    fontSize: "32px",
                    fontWeight: 600,
                }}
            >
                View Product Details
            </Typography>
            <Card 
                sx={{
                    backgroundColor: 'white-smoke',
                    margin: '1rem',
                    maxWidth: '50%'
                }}
            >
                <Typography>Supplier ID</Typography>
                <Typography>Supplier Name</Typography>
            </Card>
        </Grid>
        <TableContainer sx={{ 
                              maxHeight: '70vh', 
                              padding: 1, 
                              margin: '1rem',  
                              alignItems: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                            }}
        >
            <Paper sx={{ width: '40%'}}>
                <Table>
                    <TableHead sx={{backgroundColor: '#FF9933'}}>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </TableContainer>
    </Grid>
  );
}
