"use client";

import Link from "next/link";
import { bankService } from "@/shared/services";
import BankItem from "@/shared/components/ui/BankItem";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Bank {
  id: string;
  name: string;
  code: string;
}

export default function BankListPage() {
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    // função async dentro do useEffect
    async function loadBanks() {
      const data = await bankService.getAll();
      setBanks(data.filter((b: Bank) => b.id)); // filtra para garantir que o id é uma string
    }

    loadBanks(); // chama a função async
  }, []);

  function handleRemoved() {
    // recarrega a lista após exclusão
    async function reload() {
      const data = await bankService.getAll();
      setBanks(data.filter((b: Bank) => b.id));
    }
    reload();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Bancos</h1>
      <Link
        href="/banks/create"
        className="bg-green-500 px-4 py-2 rounded"
      >
        <Button variant="primary">Cadastrar Banco</Button>
      </Link>

      <ul className="mt-4 space-y-2">
        {banks.map((bank) => (
          <li key={bank.id} className="border p-2 flex justify-between">
            <span>
              {bank.name} ({bank.code})
            </span>
            <div className="flex gap-2">
              <Link href={`/banks/${bank.id}`}>Detalhes</Link>
              <Link href={`/banks/${bank.id}/edit`}>Editar</Link>

              <BankItem bankId={bank.id} onRemoved={handleRemoved} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
