"use client";

import Link from "next/link";
import { bankService } from "@/lib/services";
import BankItem from "@/lib/components/ui/BankItem";
import { useEffect, useState } from "react";

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
      setBanks(data.filter((b: Bank) => b.id));
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
      <h1 className="text-2xl mb-4">Lista de Bancos</h1>
      <Link
        href="/banks/create"
        className="bg-green-500 px-4 py-2 rounded"
      >
        Novo Banco
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
