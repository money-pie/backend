import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findOne(user: User): Promise<User> {
    try {
      return this.userRepository.findByPk(user.id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async setNotifications(user: User): Promise<any> {
    try {
      const { notification } = await this.findOne(user);
      const turnedNotification = false;
      const data = {
        notification: true,
      };
      if (notification) {
        data.notification = turnedNotification;
      }
      return this.userRepository.update(data, {
        where: { id: user.id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return this.userRepository.findOne({
        where: { email },
        include: { all: true },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (err) {
      throw new Error(err);
    }
  }
}
