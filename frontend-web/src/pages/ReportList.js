import React, { useEffect, useState } from 'react';
import styles from "styled-components";
import axios from 'axios';


const ReportList = () => {
  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 

  useEffect(() => {
   
    function fetchSiteData() {
    axios
        .get('http://localhost:8072/site/')
        .then(( response ) => {
        console.log(response.data)
        setSites(response.data);
        }).catch(( error ) => {
        alert("An error occures when fecthing supplier data!!");
        console.log(error);
        });
    }
    fetchSiteData();
}, [])

    const filterOrders = sites.filter(( item ) => {
    const { siteName } = item;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return(
        siteName.toLowerCase().includes(lowerCaseQuery)
    );
});


  

  return (
    <div>
      <center><Topic>Order Reports</Topic></center>

      <ListContainer>
        {filterOrders.map((item) => (
          <ListContainerRow key={item.siteName}>
            <Text>{item.siteName}</Text>
            <Text>
              <ViewBtn >
              <LinkTo href = "/requestlists">View</LinkTo>
              </ViewBtn>
            </Text>
          </ListContainerRow>
        ))}
      </ListContainer>

      
    </div>
  );
};

const Topic = styles("div")`
    font-family: 'Red Hat Display', sans-serif;
    font-size: 64px;
    font-weight: 500;
    line-height: 85px;
    letter-spacing: 0em;
    text-align: center;
    color: #000;
    position: center;
`;

const ListContainer = styles("table")`
    width: 600px;
    margin: 0 auto; /* Center the table horizontally */
`;

const ListContainerRow = styles("tr")`
    display: flex;
    justify-content: space-between;
    width: 600px;
    height: 60px;
    border-radius: 5px;
    border: 0 solid #000000;
    box-shadow: 0px 4px 4px 0px #00000040;
    background: #ffffff;
    margin: 10px 0; /* Add space between rows */
`;

const Text = styles("td")`
    width: 143px;
    height: 42px;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 60px;
    color: #000;
    justify-content: center;
    align-content: center;
    margig-left:100px;
`;

const ViewBtn = styles("button")`
    width: 100px;
    height: 45px;
    border: 0.5px solid #FF9933;
    box-shadow: 0px 4px 4px 0px #00000040;
    background: #FF9933;
    border-radius: 30px;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 32px;
    font-weight: 400;
`;

const LinkTo = styles("a")`
    text-decoration: none;
    color: #000;
`;

export default ReportList;