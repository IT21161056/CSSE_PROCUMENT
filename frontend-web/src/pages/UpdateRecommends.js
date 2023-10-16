import React from 'react'
import styles from "styled-components";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const UpdateRecommends = () => {


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          rid: data.get('rid'),
          recommend: data.get('recommend'),
        });
      };



  return (
    <div>

<div>
      <center>
        <Topic>Recommended Changes</Topic>
      </center>

      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{border: '2px solid #FF9933', borderRadius: '20px' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <label for="rid">Request ID</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="rid"
              label="Request ID"
              name="rid"
              autoComplete="rid"
              autoFocus
              color="warning"
            />
            <br></br>
            <br></br>
             <label for="description">Description</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="textarea"
              id="description"
              autoComplete="description"
              color="warning"
              multiline
              rows={5}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      
    </div>
      
    </div>
  )
}

const Topic = styles("div")`
    font-family: 'Red Hat Display', sans-serif;
    font-size: 40px;
    font-weight: 1000;
    line-height: 85px;
    letter-spacing: 0em;
    text-align: center;
    color: #000; /* Text color */
    position: center;
`;


export default UpdateRecommends
