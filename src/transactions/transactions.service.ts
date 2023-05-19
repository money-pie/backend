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
      const usr = await this.userService.findOne(user);
      const userId = usr.id;
      const groupId = usr.id;
      return this.transactionRepository.findOne({
        where: { id, [Op.or]: [{ userId }, { groupId }] },
        include: { all: true },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all transactions`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
