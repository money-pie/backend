import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Category, Kind, Month } from "src/transactions/transactions.constants";
import {
  FIND_ALL_FILTERED_ERROR,
  FIND_ALL_TRANSACTIONS_ERROR,
  FIND_INFO_ERROR,
  FIND_TRANSACTION_ERROR,
  FIND_USER_ERROR,
} from "./demo.constants";
import { MockTransaction, TransactionInfo } from "./mocks/transaction";
import { mapOfTransactions, usr } from "./mocks/transactions.mocks";

@Injectable()
export class DemoService {
  async findOneUsr() {
    try {
      return usr;
    } catch (err) {
      throw new HttpException(FIND_USER_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findOneById(id: string) {
    const transaction = mapOfTransactions.get(id);
    if (!transaction) {
      throw new HttpException(FIND_TRANSACTION_ERROR, HttpStatus.NOT_FOUND);
    }
    return transaction;
  }

  async findAll(personal: boolean) {
    try {
      const transactions = Array.from(mapOfTransactions.values());
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.personal === personal,
      );
      return filteredTransactions;
    } catch (err) {
      throw new HttpException(
        FIND_ALL_TRANSACTIONS_ERROR,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllFiltered(
    personal: boolean,
    category: Category,
    month: Month,
    year: number,
  ) {
    try {
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
    } catch (err) {
      throw new BadRequestException(FIND_ALL_FILTERED_ERROR);
    }
  }

  async findInfo(personal: boolean, kind: Kind, month: Month, year: number) {
    try {
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
        trArr.push({
          category: categories[i],
          sum: categorySum,
          count: counter,
        });
      }

      return { sum: sum, transactionsInfo: trArr };
    } catch (err) {
      throw new BadRequestException(FIND_INFO_ERROR);
    }
  }
}
