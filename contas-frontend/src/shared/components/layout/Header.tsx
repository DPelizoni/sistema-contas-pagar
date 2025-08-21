"use client";

import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="flex-shrink-0">
      <Container fluid>
        <Navbar.Brand href="#">Minha App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
