"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BankFormData } from "@/shared/types";
import { bankSchema } from "@/shared/schemas";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup, Form } from "react-bootstrap";

interface BankFormProps {
  id?: string;
  defaultValues?: BankFormData; // usado para edição
  onSubmit: (data: BankFormData) => Promise<void>; // função a ser executada no submit
}

export default function BankForm({ defaultValues, onSubmit }: BankFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankFormData>({
    resolver: yupResolver(bankSchema),
    defaultValues,
  }); // Crie uma função para lidar com o submit e o redirecionamento

  const handleFormSubmit = async (data: BankFormData) => {
    try {
      await onSubmit(data); // Redireciona para a página de listagem após o sucesso
      router.push("/banks");
    } catch (error) {
      console.error("Erro no formulário:", error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 p-4 border rounded max-w-md"
    >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Informe o nome do banco"
          {...register("name")}
        />
        <Form.Text id="name" className="text-danger">
          {errors.name && <p>{errors.name.message}</p>}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 col-4" controlId="code">
        <Form.Label>Código:</Form.Label>
        <Form.Control type="text" {...register("code")} />
        <Form.Text id="code" className="text-danger">
          {errors.code && <p>{errors.code.message}</p>}
        </Form.Text>
      </Form.Group>

      <ButtonGroup className="d-flex gap-2 col-4 my-3">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => router.push("/banks")}
        >
          Cancelar
        </Button>
      </ButtonGroup>
    </Form>
  );
}
