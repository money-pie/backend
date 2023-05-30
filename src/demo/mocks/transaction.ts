import { Category, Kind } from "src/transactions/transactions.constants";

export interface MockTransaction {
  id: string;
  sum: number;
  category: Category;
  kind: Kind;
  date: string;
  personal: boolean;
  description: string;
  author: string;
}

export interface TransactionInfo {
  category: Category;
  count: number;
  sum: number;
}
