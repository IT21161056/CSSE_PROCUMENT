import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-bottom: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContactInfo>
        <p>1 Street, Colombo-01</p>
        <p>Email: info@constructionsite.com</p>
        <p>Phone: +11 2 123456</p>
      </ContactInfo>
      &copy; {new Date().getFullYear()} Construction Site. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
