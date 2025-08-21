"use client";

import { Nav } from "react-bootstrap";

export default function Sidebar() {
  return (
    <aside
      className="d-flex flex-column bg-light border-end p-3"
      style={{ width: "200px" }}
    >
      <h5 className="mb-4">Sidebar</h5>
      <Nav className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/banks">Bancos</Nav.Link>
      </Nav>
    </aside>
  );
}
