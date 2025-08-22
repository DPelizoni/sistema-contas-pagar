"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { bankService } from "@/shared/services";

interface BankItemProps {
  bankId: string;
  onRemoved: (id: string) => void; // callback para atualizar a lista
}

export default function BankItem({ bankId, onRemoved }: BankItemProps) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    // chamada real para API
    await bankService.delete(bankId);
    onRemoved(bankId); // avisa o pai para remover da lista
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => setShowModal(true)}
        title="Excluir banco"
      >
        <DeleteOutlineIcon fontSize="small" />
      </Button>

      <ConfirmDeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Excluir Banco"
        message="Você tem certeza que deseja excluir este banco? Essa ação não pode ser desfeita."
      />
    </>
  );
}
