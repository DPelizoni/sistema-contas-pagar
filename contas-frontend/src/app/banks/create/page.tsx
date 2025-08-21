"use client";

import BankForm from "@/shared/components/forms/BankForm";
import { useRouter } from "next/navigation";
import { bankService } from "@/shared/services";
import { BankFormData } from "@/shared/types";

export default function CreateBankPage() {
  const router = useRouter();

  const handleCreate = async (data: BankFormData) => {
    await bankService.create(data);
    router.push("/banks"); // volta para listagem
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Cadastro de Banco</h1>
      <BankForm onSubmit={handleCreate} />
    </div>
  );
}
