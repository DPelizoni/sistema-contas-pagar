"use client";

import { Nav } from "react-bootstrap";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

export default function Sidebar() {
  return (
    <aside
      className="d-flex flex-column bg-dark-subtle border-end p-3 "
      style={{ width: "200px" }}
    >
      <div className="d-flex flex-column align-items-center my-4">
        <SavingsOutlinedIcon fontSize="large" className="mb-2" />
      </div>
      <hr />
      <Nav className="flex-column">
        <Nav.Link href="/" className="text-black">Home</Nav.Link>
        <Nav.Link href="/banks" className="text-black">Bancos</Nav.Link>
      </Nav>
    </aside>
  );
}
