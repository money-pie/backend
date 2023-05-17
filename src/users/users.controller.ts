import { Controller, Get, Body, Patch, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/one")
  findOne(@Req() req) {
    const user = req.user;
    return this.usersService.findOne(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/notifications")
  setNotifications(@Req() req) {
    const user = req.user;
    return this.usersService.setNotifications(user);
  }
}
