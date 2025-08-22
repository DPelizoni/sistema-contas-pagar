import { BankFormData } from "@/shared/types/bankTypes";
import { createApiService } from "./apiServices";

const endpoint = "/banks";

export const bankService = createApiService<BankFormData>(endpoint);
