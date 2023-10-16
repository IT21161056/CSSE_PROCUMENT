import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import p1 from '../asset/p1.jpg';
import styled from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F7EDED;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  text-align: center;
  margin: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  
`;

const OrderButton = styled(Button)`
  transition: background-color 0.3s;
  width: 18rem;
  height: 6rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 2rem;
`;

const ImageCard = styled(Card)`
  width: 100%;
  border-radius: 12px;
`;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fffff'
      },
    },
  });

function DashBoard() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <StyledContainer>
      <Header />
      <Content>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <ImageCard>
                <CardMedia
                  component="img"
                  alt="siteimg"
                  height="auto"
                  image={p1}
                  style={{ maxWidth: '100%', borderRadius: '12px' }}
                />
              </ImageCard>
            </ImageContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentContainer>
              <ButtonRow>
                <OrderButton
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    fontSize: '16px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard/addSupplier')}
                >
                  Add Suppliers
                </OrderButton>
                <OrderButton
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    fontSize: '16px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard/allSuppliers')}
                >
                  All Suppliers
                </OrderButton>
                <OrderButton
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    fontSize: '16px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard/orderReports')}
                >
                  Order Reports
                </OrderButton>
                <OrderButton
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    fontSize: '16px',
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard/orderRequests')}
                >
                  Order Requests
                </OrderButton>
              </ButtonRow>
            </ContentContainer>
          </Grid>
        </Grid>
      </Content>
      <Footer />
    </StyledContainer>
    </ThemeProvider>
  );
}

export default DashBoard;
