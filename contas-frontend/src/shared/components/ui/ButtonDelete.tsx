"use client";

interface ButtonDeleteProps {
  onDelete: () => void;
}

export default function ButtonDelete({ onDelete }: ButtonDeleteProps) {
  return (
    <button
      onClick={onDelete}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Excluir
    </button>
  );
}
