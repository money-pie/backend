import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { Subscription } from "./models/subscription.model";
import { ALREADY_PREMIUM } from "./subscriptions.constants";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription) private subRepository: typeof Subscription,
    private readonly userService: UsersService,
  ) {}

  async create(user: User) {
    const usr: User = await this.userService.findOne(user);
    const userId: string = usr.id;

    if (usr.subId !== null) {
      throw new BadRequestException(ALREADY_PREMIUM);
    }

    const today = new Date();
    const futureDate: Date = new Date(
      today.getTime() + 30 * 24 * 60 * 60 * 1000,
    );
    const data = {
      endDate: futureDate,
      active: true,
    };

    const response = await this.subRepository.create(data);
    this.userService.updateSub(response.id, userId);

    return response;
  }

  async unsub(user: User) {
    const usr: User = await this.userService.findOne(user);
    return this.subRepository.destroy({ where: { id: usr.subId } });
  }
}
