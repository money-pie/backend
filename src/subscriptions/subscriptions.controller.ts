import { Controller, Post, Delete, Req, UseGuards } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateSubResponse } from "./response/subscriptions.responses";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";

@ApiTags("Premium subscription endpoints")
@ApiBearerAuth()
@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: "Get a premium subscription" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: "Subscription information data",
    type: CreateSubResponse,
  })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @Post("/subscribe")
  create(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.create(user);
  }

  @ApiOperation({ summary: "Cancel subscription" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Subscription was canceled",
    type: Boolean,
  })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @Delete("/unsub")
  remove(@Req() req) {
    const user = req.user;
    return this.subscriptionsService.unsub(user);
  }
}
