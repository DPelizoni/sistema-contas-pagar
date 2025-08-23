// utils/dateFormatter.ts
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateToReadable = (
  dateString: string | undefined
): string => {
  if (!dateString) {
    return ""; // Retorna uma string vazia se a data não existir
  }
  try {
    const date = new Date(dateString);
    // 'dd/MM/yyyy HH:mm:ss' é o padrão para dia/mês/ano hora:minuto:segundo
    return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return dateString; // Retorna a string original em caso de erro
  }
};
