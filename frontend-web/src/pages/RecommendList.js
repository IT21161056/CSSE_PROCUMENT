import React from 'react'
import styles from "styled-components";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const columns = [
    { id: 'rid', label: 'Request ID', minWidth: 170, align: 'center'},
    { id: 'description', label: 'Description', minWidth: 170, align: 'center' },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];
  
  function createData(rid, description) {
    return { rid, description, action: '' };
  }
  
  const rows = [
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
    createData('Request 1', 'Your Order has been declined. Please reduce the quantities upto LKR 200000'),
  ];
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const RecommendList = () => {

    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleButtonClick = (row, action) => {
    // Handle the button click for the specific row and action (approve or decline)
    console.log(`Button clicked for row with Request ID: ${row.rid}, Action: ${action}`);
  };

  



  //successful message
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  return (
    <div>
      <div>
      <center>
        <Topic>Declined Requests</Topic>
      </center>

      <Paper
        sx={{
          width: "75%",
          overflow: "hidden",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <TableContainer sx={{ maxHeight: 440, scrollbarColor: "auto" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ scrollbarColor: "#FF9933" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      color: "#FF9933",
                      border: "0.2px solid #FF9933",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.rid}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              border: "0.2px solid #FF9933",
                              fontSize: "14px",
                            }}
                          >
                            {column.id === "action" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  href="/updaterecommendst"
                                  variant="contained"
                                  color="warning"
                                  sx={{
                                    minHeight: "auto",
                                    borderRadius: "10px",
                                    textTransform: "unset",
                                  }}
                                >
                                  <EditIcon/>
                                </Button>
                                <div style={{ width: "10px" }} />
                                <Button
                                  href='/recommends'
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleButtonClick(row, "decline")
                                  }
                                  sx={{
                                    minHeight: "auto",
                                    borderRadius: "10px",
                                    textTransform: "unset",
                                  }}
                                >
                                  <DeleteForeverIcon/>
                                </Button>
                                <div style={{ width: "10px" }} />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleClick}
                                  sx={{
                                    minHeight: "auto",
                                    borderRadius: "10px",
                                    textTransform: "unset",
                                  }}
                                >
                                  <SendIcon/>
                                </Button>
                              </div>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 8, 10]}
          component="div"
          count={rows.length}
          color="warning"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{position: 'absolute',
            top: '50%',
            left: '50%',
            bottom: '50%',
            right: '50%',
            transform: 'translate(150%, -80%)',        
        }}
      >
        <Alert
          
          sx={{
            width: '300px',
            backgroundColor: 'white',
            borderColor: '#FF9933',
            display: 'flex',
            color: '#000',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '3px solid #FF9933'
          }}
          icon={false}
        >
          <span sx={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
          <CloseIcon onClick={handleClose} 
          sx={{ color: '#000', 
                width: '20px', 
                height: '20px', 
                marginLeft: '300px',
              }}
                />
          </span><br></br>
          <span><TaskAltIcon sx={{ color: '#FF9933', width: '70px', height: '70px'}}/></span>
          <center><h3 >Budget Approved Successfully!</h3></center>
          <center>
            <Button 
                  variant="contained"
                  color="warning"
                  sx={{
                      minHeight: "auto",
                      borderRadius: "30px",
                      textTransform: "unset",
            }}>
                OK
            </Button>
          </center>
        </Alert>
      </Snackbar>
    </div>
    </div>
  )
}

const Topic = styles("div")`
    font-family: 'Red Hat Display', sans-serif;
    font-size: 64px;
    font-weight: 500;
    line-height: 85px;
    letter-spacing: 0em;
    text-align: center;
    color: #000; /* Text color */
    position: center;
`;

const SiteContainer = styles("table")`
    width: 375px;
    height: 60px;
    border-radius: 30px;
    border: 0 solid #FF9933;
    box-shadow: 0px 4px 4px 0px #00000040;
    background: #ffffff;
    margin-left: 200px;
    margin-bottom: 20px;
`;

const SiteContainerRow = styles("tr")`
    width: 375px;
    height: 60px;
    border-radius: 30px;
    box-shadow: 0px 4px 4px 0px #00000040;
    background: #ffffff;
    margin-left: 20px;
    margin-bottom: 20px;
`;


const TextSite = styles("td")`
    width: 375px;
    height: 42px;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 60px;
    color: #000;
    text-align: center';
    justify-content: center;
    align-content: center;
    margin-left: 100px;
    justify-content: center;
    align-content: center;
    border-radius: 30px;
    border: 2px solid #FF9933;
`;



export default RecommendList
