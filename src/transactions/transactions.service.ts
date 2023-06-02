import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, QueryTypes } from "sequelize";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./models/transaction.model";
import {
  Category,
  Month,
  EXCESSING_CATEGORIES,
  Kind,
  CREATE_TRANSACTION_ERROR,
  FIND_TRANSACTION_ERROR,
  FIND_TRANSACTIONS_ERROR,
  FIND_INFO_ERROR,
} from "./transactions.constants";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private readonly userService: UsersService,
  ) {}

  async create(user: User, createTransactionDto: CreateTransactionDto) {
    const { id, groupId, subId } = await this.userService.findOne(user);
    const transaction = {
      sum: createTransactionDto.sum,
      category: createTransactionDto.category,
      kind: createTransactionDto.kind,
      date: createTransactionDto.date,
      personal: createTransactionDto.personal,
      description: createTransactionDto.description,
      userId: id,
      groupId: createTransactionDto.personal ? null : groupId,
    };

    try {
      if (subId) {
        return this.transactionRepository.create(transaction);
      }
    } catch (err) {
      throw new HttpException(
        CREATE_TRANSACTION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let uniqueCategories: Category[];

    try {
      uniqueCategories = await this.transactionRepository
        .findAll({
          attributes: [
            [
              this.transactionRepository.sequelize.fn(
                "DISTINCT",
                this.transactionRepository.sequelize.col("category"),
              ),
              "category",
            ],
          ],
        })
        .then((categories) => {
          return categories.map((category) => category.category);
        });
    } catch (err) {
      throw new HttpException(
        CREATE_TRANSACTION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (
      uniqueCategories.length >= 5 &&
      !uniqueCategories.includes(createTransactionDto.category)
    ) {
      throw new BadRequestException(EXCESSING_CATEGORIES);
    }

    try {
      return this.transactionRepository.create(transaction);
    } catch (err) {
      throw new HttpException(
        CREATE_TRANSACTION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneById(user: User, id: string) {
    const usr: User = await this.userService.findOne(user);
    const userId: string = usr.id;
    const groupId: string = usr.id;

    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id, [Op.or]: [{ userId }, { groupId }] },
      });

      return transaction;
    } catch (err) {
      throw new HttpException(FIND_TRANSACTION_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(user: User, personal: boolean) {
    const usr: User = await this.userService.findOne(user);
    try {
      const userId: string = usr.id;
      const groupId: string = usr.id;

      const whereQuery = personal
        ? { personal, userId }
        : { personal, groupId };

      return this.transactionRepository.findAll({
        where: whereQuery,
        order: [["date", "DESC"]],
      });
    } catch (err) {
      throw new HttpException(FIND_TRANSACTIONS_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findAllPagination(
    user: User,
    personal: boolean,
    page: number,
    limit: number,
  ) {
    const usr: User = await this.userService.findOne(user);
    try {
      const userId: string = usr.id;
      const groupId: string = usr.id;

      const whereQuery = personal
        ? { personal, userId }
        : { personal, groupId };

      const offset: number = (page - 1) * limit;
      return this.transactionRepository.findAll({
        where: whereQuery,
        offset,
        limit,
        order: [["date", "DESC"]],
      });
    } catch (err) {
      throw new HttpException(FIND_TRANSACTIONS_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findAllFiltered(
    user: User,
    personal: boolean,
    page: number,
    limit: number,
    category: Category,
    month: Month,
    year: number,
  ) {
    const offset: number = (page - 1) * limit;
    const usr: User = await this.userService.findOne(user);
    try {
      const userId: string = usr.id;
      const groupId: string = usr.id;

      const whereQuery = {
        personal,
        [personal ? "userId" : "groupId"]: personal ? userId : groupId,
        date: {
          [Op.and]: [
            { [Op.gte]: `${year}-${month}-01` },
            {
              [Op.lte]: `${year}-${month}-${this.getDaysInMonth(year, month)}`,
            },
          ],
        },
        category,
      };

      let sum: number = await this.transactionRepository.sum("sum", {
        where: whereQuery,
      });
      const transactions = await this.transactionRepository.findAll({
        where: whereQuery,
        offset,
        limit,
        order: [["date", "DESC"]],
      });

      if (sum === null) {
        sum = 0;
      }

      return { sum, transactions };
    } catch (err) {
      throw new HttpException(FIND_TRANSACTIONS_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async findInfo(
    user: User,
    personal: boolean,
    kind: Kind,
    month: Month,
    year: number,
  ) {
    const usr: User = await this.userService.findOne(user);
    try {
      const userId: string = usr.id;
      const groupId: string = usr.id;

      const whereQuery = {
        personal,
        kind,
        [personal ? "userId" : "groupId"]: personal ? userId : groupId,
        date: {
          [Op.and]: [
            { [Op.gte]: `${year}-${month}-01` },
            {
              [Op.lte]: `${year}-${month}-${this.getDaysInMonth(year, month)}`,
            },
          ],
        },
      };

      const transactionsInfo = await this.transactionRepository.sequelize.query(
        `
      SELECT
        category,
        COUNT(*) AS count,
        SUM(sum) AS sum
      FROM
        transaction
      WHERE
        personal = :personal AND
        kind = :kind AND
        ${personal ? "user_id" : "group_id"} = :id AND
        date >= :start AND
        date <= :end
      GROUP BY
        category
    `,
        {
          replacements: {
            personal: whereQuery.personal,
            kind: whereQuery.kind,
            id: personal ? userId : groupId,
            start: `${year}-${month}-01`,
            end: `${year}-${month}-${this.getDaysInMonth(year, month)}`,
          },
          type: QueryTypes.SELECT,
        },
      );

      let sum: number = await this.transactionRepository.sum("sum", {
        where: whereQuery,
      });

      if (sum === null) {
        sum = 0;
      }

      return { sum, transactionsInfo };
    } catch (err) {
      throw new HttpException(FIND_INFO_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async remove(user: User, id: string): Promise<boolean> {
    const usr: User = await this.userService.findOne(user);
    try {
      const userId: string = usr.id;

      await this.transactionRepository.destroy({ where: { id, userId } });
      return true;
    } catch (err) {
      return;
    }
  }

  private getDaysInMonth(year: number, month: Month): number {
    const monthNumber: number = parseInt(month);
    if (monthNumber === 2) {
      if (year % 400 === 0) {
        return 29;
      } else if (year % 100 === 0) {
        return 28;
      } else if (year % 4 === 0) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 30 + ((monthNumber + (monthNumber >> 3)) & 1);
    }
  }
}
