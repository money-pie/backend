import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { Subscription } from "./models/subscription.model";
import {
  ALREADY_PREMIUM,
  SUB_ERROR,
  UNSUB_ERROR,
} from "./subscriptions.constants";

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

    try {
      const response = await this.subRepository.create(data);
      this.userService.updateSub(response.id, userId);

      return response;
    } catch (err) {
      throw new HttpException(SUB_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsub(user: User): Promise<boolean> {
    const usr: User = await this.userService.findOne(user);
    try {
      this.subRepository.destroy({ where: { id: usr.subId } });
      return true;
    } catch (err) {
      throw new HttpException(UNSUB_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
