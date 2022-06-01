export interface Transaction {
  accountNumberFrom: string;
  accountNumberTo: string | null;
  accountOwnerId: number;
  amount: number;
  cause: string | null;
  date: string;
  id: number;
  type?: number;
}
