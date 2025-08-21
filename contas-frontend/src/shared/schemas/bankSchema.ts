import * as yup from "yup";

// Schema de validação para criação/edição de banco
// Responsável por garantir que os dados enviados estão corretos
export const bankSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  code: yup
    .string()
    .required("Código é obrigatório")
    .length(3, "Código deve ter 3 números"),
});
