import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "src/users/users.service";
import { User } from "../users/models/user.model";
import { FIND_HINT_ERROR, FIND_USER_ERROR } from "./hints.constants";
import { Hint } from "./models/hint.models";
import { HintUsers } from "./models/hintUsers.model";

@Injectable()
export class HintsService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Hint)
    private hintModel: typeof Hint,
    @InjectModel(HintUsers)
    private hintUsersModel: typeof HintUsers,
    private readonly userService: UsersService,
  ) {}

  async createHintForUser(userId: string) {
    try {
      const hintId: number = await this.getRandomEntityId(userId);
      if (!hintId) {
        throw new HttpException(FIND_HINT_ERROR, HttpStatus.NOT_FOUND);
      }

      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new HttpException(FIND_USER_ERROR, HttpStatus.NOT_FOUND);
      }

      const hint = await this.hintModel.findByPk(hintId);
      if (!hint) {
        throw new HttpException(FIND_HINT_ERROR, HttpStatus.NOT_FOUND);
      }

      await this.hintUsersModel.create({
        hintId,
        userId,
      });
    } catch (err) {
      return;
    }
  }

  async findAllHintsForUser(usr: User): Promise<Hint[]> {
    try {
      const { id } = await this.userService.findOne(usr);

      const user = await this.userModel.findByPk(id, {
        include: [
          {
            model: Hint,
            through: { attributes: [] },
          },
        ],
      });
      if (!user) {
        throw new HttpException(FIND_USER_ERROR, HttpStatus.NOT_FOUND);
      }

      return user.hints;
    } catch (err) {
      return;
    }
  }

  async removeHintForUser(user: User, hintId: number): Promise<void> {
    try {
      const usr: User = await this.userService.findOne(user);
      const userId: string = usr.id;
      console.log("USER.ID = ", userId);
      const hintUser = await this.hintUsersModel.findOne({
        where: {
          hintId,
          userId,
        },
      });
      if (!hintUser) {
        throw new HttpException(FIND_HINT_ERROR, HttpStatus.NOT_FOUND);
      }

      await hintUser.destroy();
    } catch (err) {
      return;
    }
  }

  private async getRandomEntityId(userId: string): Promise<number> {
    try {
      const excludedIds: number[] = await this.getUniqueHintId(userId);
      const n: number = await this.countHints();
      const allEntityIds: number[] = Array.from(
        { length: n },
        (_, index) => index + 1,
      );
      const availableIds: number[] = allEntityIds.filter(
        (id) => !excludedIds.includes(id),
      );

      if (availableIds.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * availableIds.length);
      return availableIds[randomIndex];
    } catch (err) {
      return;
    }
  }

  private async getUniqueHintId(userId: string): Promise<number[]> {
    try {
      const hintUsers = await this.hintUsersModel.findAll({
        where: {
          userId: userId,
        },
        attributes: ["hintId"],
        group: ["hintId"],
      });

      const uniqueHintIds = hintUsers.map((hintUser) => hintUser.hintId);
      return uniqueHintIds;
    } catch (err) {
      return [];
    }
  }

  private async countHints(): Promise<number> {
    try {
      return await this.hintModel.count();
    } catch (err) {
      return 0;
    }
  }
}
