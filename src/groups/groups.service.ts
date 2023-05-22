import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import {
  USER_ALREADY_IN_GROUP,
  USER_NOT_FOUND_ERROR,
  FULL_GROUP_ERROR,
} from "./groups.constants";
import Group from "./models/group.model";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private readonly userService: UsersService,
  ) {}

  async create(user: User, createGroupDto: CreateGroupDto) {
    const usr: User = await this.userService.findOne(user);
    const userId: string = usr.id;
    const groupId: string = usr.groupId;
    const inviteEmail: string = createGroupDto.email;

    const candidate = await this.userService.getUserByEmail(inviteEmail);

    if (!candidate) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    if (candidate.groupId !== null) {
      throw new BadRequestException(USER_ALREADY_IN_GROUP);
    }

    if (groupId === null) {
      let max = 3;
      let premium = false;
      if (usr.subId !== null || candidate.subId !== null) {
        max = 5;
        premium = true;
      }

      const group = {
        premium: premium,
        maxCapacity: max,
        curCapacity: 2,
      };

      const newGroup = await this.groupRepository.create(group);

      this.userService.updateGroup(newGroup.id, userId);
      this.userService.updateGroup(newGroup.id, candidate.id);

      return newGroup;
    }

    const group = await this.findOne(groupId);
    let max: number = group.maxCapacity;
    let premium: boolean = group.premium;
    const hasNonNullSubId = group.users.some((user) => user.subId !== null);

    if (hasNonNullSubId) {
      max = 5;
      premium = true;
    }

    if (group.curCapacity >= max) {
      throw new BadRequestException(FULL_GROUP_ERROR);
    }

    const updatedGroup = {
      premium: premium,
      maxCapacity: max,
      curCapacity: group.curCapacity + 1,
    };

    this.userService.updateGroup(group.id, candidate.id);

    return this.groupRepository.update(updatedGroup, {
      where: { id: group.id },
    });
  }

  async exit(user: User) {
    const usr: User = await this.userService.findOne(user);
    const id: string = usr.groupId;
    const group = await this.findOne(id);

    const curCapacity: number = group.curCapacity;

    const data = {
      curCapacity: curCapacity - 1,
    };

    if (data.curCapacity <= 1) {
      return this.groupRepository.destroy({ where: { id } });
    }

    this.userService.updateGroup(null, usr.id);
    return this.groupRepository.update(data, { where: { id } });
  }

  async findOne(groupId: string) {
    const id = groupId;
    return this.groupRepository.findOne({
      where: { id },
      include: ["users"],
    });
  }

  async setAim(user: User, aim: number) {
    const usr: User = await this.userService.findOne(user);
    const id: string = usr.groupId;

    return this.groupRepository.update({ aim: aim }, { where: { id } });
  }
}
