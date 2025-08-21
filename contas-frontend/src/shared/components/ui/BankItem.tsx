"use client";

import { useState } from "react";
import ButtonDelete from "./ButtonDelete";
import { bankService } from "@/shared/services";

interface Props {
  bankId: string;
  onRemoved: () => void; // callback para atualizar a lista no pai
}

export default function BankItem({ bankId, onRemoved }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este banco?")) return;

    setLoading(true);
    try {
      await bankService.delete(bankId);
      onRemoved(); // avisa o componente pai que o banco foi removido
    } catch (error) {
      console.error("Erro ao deletar banco:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ButtonDelete onDelete={handleDelete} />
  );
}
