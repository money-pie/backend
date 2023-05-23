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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Premium subscription endpoints")
@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: "Get a premium subscription" })
  @UseGuards(JwtAuthGuard)
  @Post("/subscribe")
  create(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.create(user);
  }

  @ApiOperation({ summary: "Cancel subscription" })
  @UseGuards(JwtAuthGuard)
  @Delete("/unsub")
  remove(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.unsub(user);
  }
}
