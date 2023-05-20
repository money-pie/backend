import { Category, Kind } from "../transactions.constants";

export class CreateTransactionDto {
  readonly sum: number;
  readonly category: Category;
  readonly kind: Kind;
  readonly date: Date;
  readonly personal: boolean;
  readonly description: string;
}
