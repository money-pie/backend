import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  ParseUUIDPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Group endpoints")
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: "Invite user to group" })
  @UseGuards(JwtAuthGuard)
  @Post("/invite")
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    const user = req.user;
    return this.groupsService.create(user, createGroupDto);
  }

  @ApiOperation({ summary: "Leave a group" })
  @UseGuards(JwtAuthGuard)
  @Patch("/exit")
  exit(@Req() req) {
    const user = req.user;
    return this.groupsService.exit(user);
  }

  @ApiOperation({ summary: "Set aim for group`s budget" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "sum",
    type: Number,
    description: "Aim sum per month for group",
    example: 63500,
  })
  @Patch("/aim/:sum")
  setAim(@Req() req, @Param("sum", ParseIntPipe) aim: number) {
    const user = req.user;
    return this.groupsService.setAim(user, aim);
  }

  @ApiOperation({ summary: "Find group by id" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "id",
    type: String,
    description: "Group id",
  })
  @Get("/find/:id")
  findOne(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.groupsService.findOne(id);
  }
}
