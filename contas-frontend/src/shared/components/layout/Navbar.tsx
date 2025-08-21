"use client"

import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  background-color: #343a40;
  color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <h1>Meu App</h1>
    </StyledNavbar>
  );
};

export default Navbar;
