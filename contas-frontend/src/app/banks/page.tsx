"use client";

import Link from "next/link";
import { bankService } from "@/shared/services";
import BankItem from "@/shared/components/ui/BankItem";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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

      <Link href="/banks/create">
        <Button variant="primary">
          <AddBoxOutlinedIcon /> Cadastrar Banco
        </Button>
      </Link>
      <hr />

      {/* Tabela */}
      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Código</th>
            <th>Nome</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr key={bank.code}>
              <td>{bank.id}</td>
              <td>{bank.code}</td>
              <td>{bank.name}</td>

              <td className="d-flex justify-content-center">
                <ButtonGroup className="d-flex gap-2 col-2" size="sm">
                  <Link
                    href={`/banks/${bank.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </Link>

                  <Link
                    href={`/banks/${bank.id}/edit`}
                    className="btn btn-primary btn-sm"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Link>
                  <BankItem bankId={bank.id} onRemoved={handleRemoved} />
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
