"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import Link from "next/link";

interface Banco {
  id: number;
  nome: string;
  codigo: string;
  criado_em: string;
  atualizado_em: string;
}

export default function DetalheBancoPage({
  params,
}: {
  params: { id: string };
}) {
  const [banco, setBanco] = useState<Banco | null>(null);

  useEffect(() => {
    async function carregarDetalhesBanco() {
      try {
        const response = await api.get<Banco>(`/bancos/${params.id}/`);
        setBanco(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do banco:", error);
      }
    }

    carregarDetalhesBanco();
  }, [params.id]);

  if (!banco) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhes do Banco</h1>
      <p>
        <strong>ID:</strong> {banco.id}
      </p>
      <p>
        <strong>Nome:</strong> {banco.nome}
      </p>
      <p>
        <strong>Código:</strong> {banco.codigo}
      </p>
      <p>
        <strong>Criado em:</strong> {new Date(banco.criado_em).toLocaleString()}
      </p>
      <p>
        <strong>Atualizado em:</strong>{" "}
        {new Date(banco.atualizado_em).toLocaleString()}
      </p>
      <Link href="/bancos">
        <button style={{ marginTop: 20 }}>Voltar para a lista</button>
      </Link>
    </div>
  );
}
