"use client";

import React, { useEffect, useState } from "react";
import { bankService } from "@/lib/services/bankService";
import Link from "next/link";
import { BankFormData } from "@/lib/types/bankTypes";

export default function BankList() {
  const [banks, setBanks] = useState<BankFormData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanks = async () => {
    try {
      const response = await bankService.getAll();
      setBanks(response);
    } catch {
      alert("Erro ao carregar o banco!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  if (loading) return;
  <p>Carregando...</p>;

  return (
    <div>
      <h1>Lista de Bancos</h1>

      <Link href="/banks/create/" passHref>
        Adicionar Banco
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr key={bank.code}>
              <td>{bank.name}</td>
              <td>{bank.code}</td>
              <td>
                <Link href={`/banks/${bank.id}`} className="btn btn-info">
                  Detalhes
                </Link>
              </td>
              <td>
                <Link href={`/banks/${bank.id}/edit`} className="btn btn-info">
                  Editar
                </Link>
              </td>
              <td>
                <Link href={`/banks/${bank.id}`} className="btn btn-info">
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
