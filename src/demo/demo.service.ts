import { Injectable } from "@nestjs/common";
import { Category, Kind, Month } from "src/transactions/transactions.constants";
import { MockTransaction, TransactionInfo } from "./mocks/transaction";
import { mapOfTransactions, usr } from "./mocks/transactions.mocks";

@Injectable()
export class DemoService {
  async findOneUsr() {
    return usr;
  }

  async findOneById(id: string) {
    const transaction = mapOfTransactions.get(id);
    if (!transaction) {
      throw new Error(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async findAll() {
    return Array.from(mapOfTransactions.values());
  }

  async findAllFiltered(
    personal: boolean,
    category: Category,
    month: Month,
    year: number,
  ) {
    const resultArr: MockTransaction[] = [];
    let sum = 0;
    const numMonth: number = parseInt(month, 10) - 1;
    const entries = mapOfTransactions.entries();
    for (const [key, value] of entries) {
      const data = value as MockTransaction;
      const transactionDate = new Date(data.date);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();
      if (
        data.personal === personal &&
        data.category === category &&
        transactionYear === year &&
        transactionMonth === numMonth
      ) {
        resultArr.push(data);
        sum += data.sum;
      }
    }
    return { sum, transactions: resultArr };
  }

  async findInfo(personal: boolean, kind: Kind, month: Month, year: number) {
    const resultArr: MockTransaction[] = [];
    let sum = 0;
    const numMonth: number = parseInt(month, 10) - 1;
    const entries = mapOfTransactions.entries();
    const categories: Category[] = [];

    const trArr: TransactionInfo[] = [];

    for (const [key, value] of entries) {
      const data = value as MockTransaction;
      const transactionDate = new Date(data.date);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();
      if (
        data.personal === personal &&
        data.kind === kind &&
        transactionYear === year &&
        transactionMonth === numMonth
      ) {
        resultArr.push(data);
        sum += data.sum;

        if (!categories.includes(data.category)) {
          categories.push(data.category);
        }
      }
    }

    for (let i = 0; i < categories.length; i++) {
      let categorySum = 0;
      let counter = 0;
      for (let j = 0; j < resultArr.length; j++) {
        if (resultArr[j].category === categories[i]) {
          categorySum += resultArr[j].sum;
          counter += 1;
        }
      }
      trArr.push({ category: categories[i], sum: categorySum, count: counter });
    }

    return { sum: sum, transactionsInfo: trArr };
  }
}
