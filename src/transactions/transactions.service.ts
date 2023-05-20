import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Transaction } from "./models/transaction.model";
import {
  Category,
  Month,
  EXCESSING_CATEGORIES,
} from "./transactions.constants";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private readonly userService: UsersService,
  ) {}

  async create(user: User, createTransactionDto: CreateTransactionDto) {
    //TODO написать проверку на премиум пользователя, если не премиум то проверить сколько категория у него есть, если пытается добавить шестую, выбросить ошибку
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

    if (subId) {
      return this.transactionRepository.create(transaction);
    }

    const uniqueCategories: Category[] = await this.transactionRepository
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

    console.log(uniqueCategories);
    if (
      uniqueCategories.length >= 5 &&
      !uniqueCategories.includes(createTransactionDto.category)
    ) {
      throw new BadRequestException(EXCESSING_CATEGORIES);
    }

    return this.transactionRepository.create(transaction);
  }

  async findOneById(user: User, id: string) {
    try {
      const usr: User = await this.userService.findOne(user);
      const userId: string = usr.id;
      const groupId: string = usr.id;
      return this.transactionRepository.findOne({
        where: { id, [Op.or]: [{ userId }, { groupId }] },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(user: User, personal: boolean) {
    try {
      const usr: User = await this.userService.findOne(user);
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
      throw new Error(err);
    }
  }

  async findAllPagination(
    user: User,
    personal: boolean,
    page: number,
    limit: number,
  ) {
    try {
      const usr: User = await this.userService.findOne(user);
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
      throw new Error(err);
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

    const sum = await this.transactionRepository.sum("sum", {
      where: whereQuery,
    });
    const transactions = await this.transactionRepository.findAll({
      where: whereQuery,
      offset,
      limit,
      order: [["date", "DESC"]],
    });

    return { sum, transactions };
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
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
