"use client";

import { Navbar, Container } from "react-bootstrap";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="flex-shrink-0">
      <SavingsOutlinedIcon fontSize="large" className="mx-2 text-white" />
      <Container fluid>
        <Navbar.Brand href="/">Sistema de Contas a Pagar</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
