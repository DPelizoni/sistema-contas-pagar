"use client";

import { useState } from "react";
import { Modal, Button, Spinner, ButtonGroup } from "react-bootstrap";

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
}

export default function ConfirmDeleteModal({
  show,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  message = "Tem certeza de que deseja excluir este registro? Essa ação não pode ser desfeita.",
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      await onConfirm(); // ação de exclusão passada pelo pai
      onClose(); // fecha o modal após sucesso
    } catch (error) {
      setError(`${error}"Erro ao excluir o registro. Tente novamente."`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup className="gap-2">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Excluir"}
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}
