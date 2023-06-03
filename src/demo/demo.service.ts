import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import {
  Category,
  EngCategory,
  EngKind,
  EngMonth,
  Kind,
  Month,
} from "src/transactions/transactions.constants";
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
    engCategory: EngCategory,
    engMonth: EngMonth,
    year: number,
  ) {
    try {
      const category: Category = await this.convertCategory(engCategory);
      const month: Month = await this.convertMonth(engMonth);

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

  async findInfo(
    personal: boolean,
    engKind: EngKind,
    engMonth: EngMonth,
    year: number,
  ) {
    try {
      const kind: Kind = await this.convertKind(engKind);
      const month: Month = await this.convertMonth(engMonth);

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

  private async convertMonth(month: EngMonth): Promise<Month> {
    const monthEnum: Record<EngMonth, Month> = {
      jan: Month.JANUARY,
      feb: Month.FEBRUARY,
      mar: Month.MARCH,
      apr: Month.APRIL,
      may: Month.MAY,
      jun: Month.JUNE,
      jul: Month.JULY,
      aug: Month.AUGUST,
      sep: Month.SEPTEMBER,
      oct: Month.OCTOBER,
      nov: Month.NOVEMBER,
      dec: Month.DECEMBER,
    };

    const monthNumber = monthEnum[month];

    if (monthNumber) {
      return monthNumber;
    } else {
      throw new Error("Invalid month name or abbreviation.");
    }
  }

  private async convertKind(kind: EngKind): Promise<Kind> {
    switch (kind) {
      case EngKind.COSTS:
        return Kind.COSTS;
      case EngKind.INCOME:
        return Kind.INCOME;
      default:
        throw new Error("Invalid kind.");
    }
  }

  private async convertCategory(category: EngCategory): Promise<Category> {
    switch (category) {
      case EngCategory.PRODUCTS:
        return Category.PRODUCTS;
      case EngCategory.ENTERTAINMENT:
        return Category.ENTERTAINMENT;
      case EngCategory.TRANSPORT:
        return Category.TRANSPORT;
      case EngCategory.HEALTH:
        return Category.HEALTH;
      case EngCategory.HOME:
        return Category.HOME;
      case EngCategory.EDUCATION:
        return Category.EDUCATION;
      case EngCategory.FITNESS:
        return Category.FITNESS;
      case EngCategory.TAXES:
        return Category.TAXES;
      case EngCategory.SALARY:
        return Category.SALARY;
      case EngCategory.REWARD:
        return Category.REWARD;
      case EngCategory.PRESENT:
        return Category.PRESENT;
      case EngCategory.SALES:
        return Category.SALES;
      case EngCategory.OTHER:
        return Category.OTHER;
      default:
        throw new Error("Invalid category.");
    }
  }
}
