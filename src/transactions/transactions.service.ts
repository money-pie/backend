import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { User } from "src/users/models/user.model";
import { UsersService } from "src/users/users.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Transaction } from "./models/transaction.model";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
    private readonly userService: UsersService,
  ) {}

  async create(user: User, createTransactionDto: CreateTransactionDto) {
    try {
      const { id, groupId } = await this.userService.findOne(user);
      const transaction = {
        sum: createTransactionDto.sum,
        category: createTransactionDto.category,
        date: createTransactionDto.date,
        personal: createTransactionDto.personal,
        description: createTransactionDto.description,
        userId: id,
        groupId: createTransactionDto.personal ? null : groupId,
      };
      return this.transactionRepository.create(transaction);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneById(user: User, id: string) {
    try {
      const usr: User = await this.userService.findOne(user);
      const userId: string = usr.id;
      const groupId: string = usr.id;
      return this.transactionRepository.findOne({
        where: { id, [Op.or]: [{ userId }, { groupId }] },
        include: { all: true },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(user: User, personal: boolean, page: number, limit: number) {
    const offset: number = (page - 1) * limit;
    const usr: User = await this.userService.findOne(user);
    const userId: string = usr.id;
    const groupId: string = usr.id;

    if (personal) {
      return this.transactionRepository.findAll({
        where: { personal, userId },
        offset,
        limit,
        order: [["date", "DESC"]],
      });
    }

    return this.transactionRepository.findAll({
      where: { personal, groupId },
      offset,
      limit,
      order: [["date", "DESC"]],
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
