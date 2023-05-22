import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/subscribe")
  create(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/unsub")
  remove(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.unsub(user);
  }
}
