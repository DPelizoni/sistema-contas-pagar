"use client"; // necessário para usar useState e useEffect

import { useEffect, useState } from "react";
import api from "../../lib/services/api";
import Link from "next/link";
import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Icon from "@mdi/react";
import { mdiSquareEditOutline } from "@mdi/js";
import { mdiEyeOutline } from "@mdi/js";
import { mdiPlusBox } from "@mdi/js";
import { mdiUpdate } from "@mdi/js";
import { mdiCancel } from "@mdi/js";

interface Banco {
  id: number;
  nome: string;
  codigo: string;
}

export default function BancosPage() {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarBancos();
  }, []);

  async function carregarBancos() {
    const response = await api.get<Banco[]>("bancos/");
    setBancos(response.data);
    console.log("Bancos carregados:", response.data);
  }

  async function salvarBanco() {
    if (!nome || !codigo) return;

    if (editandoId) {
      await api.put(`bancos/${editandoId}/`, { nome, codigo });
      setEditandoId(null);
    } else {
      await api.post("bancos/", { nome, codigo });
    }

    setNome("");
    setCodigo("");
    carregarBancos();
  }

  async function editarBanco(banco: Banco) {
    setNome(banco.nome);
    setCodigo(banco.codigo);
    setEditandoId(banco.id);
  }

  async function excluirBanco(id: number) {
    if (confirm("Tem certeza que deseja excluir este banco?")) {
      await api.delete(`bancos/${id}/`);
      carregarBancos();
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Bancos</h1>

      <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
        <TextField
          id="outlined-basic"
          label="Nome do Banco"
          variant="filled"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="off"
        />

        <TextField
          id="outlined-basic"
          label="Número do Banco"
          variant="filled"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{ marginLeft: 1 }}
          autoComplete="off"
        />

        <Button onClick={salvarBanco} sx={{ marginLeft: 1 }}>
          {editandoId ? (
            <Button variant="outlined" color="primary">
              <Icon path={mdiUpdate} size={1} />
              Atualizar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              startIcon={<Icon path={mdiPlusBox} size={1} />}
            >
              Adicionar
            </Button>
          )}
        </Button>

        <Button sx={{ marginLeft: 1 }}>
          {editandoId && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setEditandoId(null);
                setNome("");
                setCodigo("");
              }}
            >
              <Icon path={mdiCancel} size={1} />
              Cancelar
            </Button>
          )}
        </Button>
      </Box>

      <div>
        <h1>Lista de Bancos</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Número</th>
              <th colSpan={3}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bancos.map((banco) => (
              <tr key={banco.id}>
                <td>{banco.id}</td>
                <td>{banco.nome}</td>
                <td>{banco.codigo}</td>
                <td>
                  <Link href={`/bancos/${banco.id}`} passHref>
                    <IconButton aria-label="visualizar" color="primary">
                      <Icon path={mdiEyeOutline} size={1} />
                    </IconButton>
                  </Link>
                </td>

                <td>
                  <IconButton
                    aria-label="edit"
                    onClick={() => editarBanco(banco)}
                  >
                    <Icon path={mdiSquareEditOutline} size={1} />
                  </IconButton>
                </td>

                <td>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      color="error"
                      onClick={() => excluirBanco(banco.id)}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
      </div>
    </div>
  );
}
