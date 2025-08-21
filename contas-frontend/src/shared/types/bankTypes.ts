export interface BankFormData {
  id?: string;
  name: string;
  code: string;
}

export interface EditBankPageProps {
  params: {
    id: string;
  };
}
