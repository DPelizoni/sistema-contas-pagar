import { bankService } from "@/shared/services";
import BankForm from "@/shared/components/forms/BankForm";
import { BankFormData } from "@/shared/types";
import { redirect } from "next/navigation"; // Importe 'redirect'

export default async function EditBankPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const bank = await bankService.getById(id); // Adicione uma verificação para o caso de o banco não ser encontrado

  if (!bank) {
    redirect("/banks"); // Redireciona para a lista caso não encontre o banco
  }

  const onSubmit = async (data: BankFormData) => {
    "use server"; // Usa a diretiva 'use server' para rodar esta função no servidor
    try {
      await bankService.update(id, data);
    } catch (error) {
      console.error("Erro ao atualizar banco:", error); // Poderia adicionar uma lógica de erro aqui (ex: retornar um objeto de erro)
    }
  };

  return (
    <div>
      <h1>Editar Banco</h1>
      <BankForm defaultValues={bank} onSubmit={onSubmit} />{" "}
    </div>
  );
}
