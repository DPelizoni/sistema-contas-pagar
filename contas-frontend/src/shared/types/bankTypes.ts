export interface BankFormData {
  id?: string;
  name: string;
  code: string;
  created_at?: string;
  updated_at?: string;
}

export interface EditBankPageProps {
  params: {
    id: string;
  };
}
