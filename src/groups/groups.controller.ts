import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/invite")
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    const user = req.user;
    return this.groupsService.create(user, createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/exit")
  exit(@Req() req) {
    const user = req.user;
    return this.groupsService.exit(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/aim/:sum")
  setAim(@Req() req, @Param("sum", ParseIntPipe) aim: number) {
    const user = req.user;
    return this.groupsService.setAim(user, aim);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/find/:id")
  findOne(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.groupsService.findOne(id);
  }
}
