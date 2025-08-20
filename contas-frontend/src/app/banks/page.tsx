import Link from "next/link";
import { BankFormData } from "@/lib/types";
import { bankService } from "@/lib/services";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default async function BankListPage() {
  const banks: BankFormData[] = await bankService.getAll();

  // Ação de deleção para o servidor
  async function excluirBanco(id: number) {
    if (confirm("Tem certeza que deseja excluir este banco?")) {
      await bankService.delete(`bancos/${id}/`);
      // carregarBancos();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Lista de Bancos</h1>
      <Link
        href="/banks/create"
        className="bg-green-500 text-white px-4 py-2 rounded"
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
              {/* Formulário para a Server Action */}
              <IconButton aria-label="delete">
                <DeleteIcon
                  // onClick={() => excluirBanco(bank.id)}
                />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
