import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import * as bcrypt from "bcryptjs";
import {
  AIM_ERROR,
  CREATE_USER_ERROR,
  FIND_USER_BY_EMAIL_ERROR,
  FIND_USER_ERROR,
  HASH_ERROR,
  NOTIFICATION_SETTINGS_ERROR,
  SUBSCRIPTION_ERROR,
  UPDATE_GROUP_ERROR,
} from "./users.constants";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (err) {
      throw new HttpException(
        CREATE_USER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(user: User): Promise<User> {
    try {
      return this.userRepository.findByPk(user.id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
    } catch (err) {
      throw new HttpException(FIND_USER_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async setNotifications(user: User): Promise<any> {
    const { notification } = await this.findOne(user);
    const turnedNotification = false;
    const data = {
      notification: true,
    };
    if (notification) {
      data.notification = turnedNotification;
    }
    try {
      return this.userRepository.update(data, {
        where: { id: user.id },
      });
    } catch (err) {
      throw new HttpException(
        NOTIFICATION_SETTINGS_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateGroup(groupId: string, id: string): Promise<void> {
    try {
      const data = {
        groupId: groupId,
      };
      this.userRepository.update(data, {
        where: { id: id },
      });
    } catch (err) {
      throw new HttpException(
        UPDATE_GROUP_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateSub(sub: string, id: string): Promise<void> {
    try {
      this.userRepository.update(
        { subId: sub },
        {
          where: { id: id },
        },
      );
    } catch (err) {
      throw new HttpException(
        SUBSCRIPTION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email },
      });
    } catch (err) {
      throw new HttpException(FIND_USER_BY_EMAIL_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (err) {
      throw new HttpException(HASH_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setAim(user: User, aim: number): Promise<boolean> {
    const usr: User = await this.findOne(user);
    try {
      await this.userRepository.update({ aim: aim }, { where: { id: usr.id } });
      return true;
    } catch (err) {
      throw new HttpException(AIM_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
