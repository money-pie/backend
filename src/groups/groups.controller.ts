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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";
import { GroupResponse } from "./response/groups.responses";

@ApiTags("Group endpoints")
@ApiBearerAuth()
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: "Invite user to group" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: "Created transaction",
    type: GroupResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Post("/invite")
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    const user = req.user;
    return this.groupsService.create(user, createGroupDto);
  }

  @ApiOperation({ summary: "Leave a group" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Created transaction",
    type: Boolean,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
  @ApiResponse({ status: 200, description: "Set aim for group", type: Boolean })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
  @ApiResponse({ status: 200, description: "Found group", type: GroupResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Get("/find/:id")
  findOne(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.groupsService.findOne(id);
  }
}
