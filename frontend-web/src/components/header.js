import React from 'react';
import styled from 'styled-components';
import c2 from '../asset/c2.png'

const HeaderContainer = styled.header`
  background-color: #FFA500;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;

    li {
      margin: 0 1rem;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={c2} alt="Construction Logo" />
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
