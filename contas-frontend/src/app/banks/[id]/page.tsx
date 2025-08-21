import { bankService } from "@/shared/services";

import Link from "next/link";

export default async function BankDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const bank = await bankService.getById(id);

  return (
    <div>
      <h1>Nome: {bank.name}</h1>
      <p>Código: {bank.code}</p>
      <p>ID: {bank.id}</p>
      <div>
        <Link href={`/banks/${id}/edit`}>Editar</Link>
        <Link href="/banks">Voltar</Link>
      </div>
    </div>
  );
}
