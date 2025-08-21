"use client";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface ButtonDeleteProps {
  onDelete: () => void;
}

export default function ButtonDelete({ onDelete }: ButtonDeleteProps) {
  return (
    <button onClick={onDelete} className="btn btn-danger btn-sm">
      <DeleteOutlineOutlinedIcon />
    </button>
  );
}
