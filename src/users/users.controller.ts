import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Req,
  ParseIntPipe,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("User endpoints")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Find one user using JWT token" })
  @UseGuards(JwtAuthGuard)
  @Get("/one")
  findOne(@Req() req) {
    const user = req.user;
    return this.usersService.findOne(user);
  }

  @ApiOperation({ summary: "Turn on/off notifications" })
  @UseGuards(JwtAuthGuard)
  @Patch("/notifications")
  setNotifications(@Req() req) {
    const user = req.user;
    return this.usersService.setNotifications(user);
  }

  @ApiOperation({ summary: "Set personal budget aim" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "sum",
    type: Number,
    description: "Aim sum per month",
    example: 45000,
  })
  @ApiResponse({
    status: 200,
    description: "Successful response",
    type: Boolean,
  })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @Patch("/aim/:sum")
  setAim(@Req() req, @Param("sum", ParseIntPipe) aim: number) {
    const user = req.user;
    return this.usersService.setAim(user, aim);
  }
}
