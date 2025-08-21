"use client";

import { Image } from "react-bootstrap";

export default function ImageSistem() {
  return (
    <Image
      src="/home.jpg"
      alt="Logo do Sistema"
      fluid
      className="rounded mx-auto d-block"
      style={{ height: "80vh", objectFit: "cover" }}
    />
  );
}
