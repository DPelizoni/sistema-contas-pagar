import { bankService } from "@/shared/services";
import Link from "next/link";
import { formatDateToReadable } from "@/shared/utils/dateFormatter";

export default async function BankDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const bank = await bankService.getById(id);

  return (
    <div>
      <h1>{bank.name}</h1>
      <p>Código: {bank.code}</p>
      <p>ID: {bank.id}</p>
      <p>Criado em: {formatDateToReadable(bank.created_at)}</p>
      <p>Atualizado em: {formatDateToReadable(bank.updated_at)}</p>
      <div>
        <Link href={`/banks/${id}/edit`}>Editar</Link>
        <Link href="/banks">Voltar</Link>
      </div>
    </div>
  );
}
