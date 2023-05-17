import { Category } from "../transactions.constants";

export class CreateTransactionDto {
  readonly sum: number;
  readonly category: Category;
  readonly date: Date;
  readonly personal: boolean;
  readonly description: string;
}
