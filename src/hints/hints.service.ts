import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "src/users/users.service";
import { User } from "../users/models/user.model";
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
    const hintId: number = await this.getRandomEntityId(userId);
    if (!hintId) {
      return;
    }

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const hint = await this.hintModel.findByPk(hintId);
    if (!hint) {
      throw new Error("Hint not found");
    }

    await this.hintUsersModel.create({
      hintId,
      userId,
    });
  }

  async findAllHintsForUser(usr: User): Promise<Hint[]> {
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
      throw new Error("User not found");
    }

    return user.hints;
  }

  async removeHintForUser(user: User, hintId: number): Promise<void> {
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
      throw new Error("HintUser not found");
    }

    await hintUser.destroy();
  }

  private async getRandomEntityId(userId: string): Promise<number> {
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
  }

  private async getUniqueHintId(userId: string): Promise<number[]> {
    const hintUsers = await this.hintUsersModel.findAll({
      where: {
        userId: userId,
      },
      attributes: ["hintId"],
      group: ["hintId"],
    });

    const uniqueHintIds = hintUsers.map((hintUser) => hintUser.hintId);
    return uniqueHintIds;
  }

  private async countHints(): Promise<number> {
    return await this.hintModel.count();
  }
}
