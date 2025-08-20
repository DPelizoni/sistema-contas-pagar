"use client";

import BankForm from "@/lib/components/forms/BankForm";
import { useRouter } from "next/navigation";
import { bankService } from "@/lib/services";
import { BankFormData } from "@/lib/types";

export default function CreateBankPage() {
  const router = useRouter();

  const handleCreate = async (data: BankFormData) => {
    await bankService.create(data);
    router.push("/banks"); // volta para listagem
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Criar Banco</h1>
      <BankForm onSubmit={handleCreate} />
    </div>
  );
}
