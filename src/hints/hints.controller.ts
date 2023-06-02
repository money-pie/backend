import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";
import { HintsService } from "./hints.service";
import { HintsResponse } from "./response/hints.responses";

@ApiTags("Hints endpoints")
@ApiBearerAuth()
@Controller("hints")
export class HintsController {
  constructor(private readonly hintsService: HintsService) {}

  @ApiOperation({ summary: "Get list of hints for user" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Hints for user",
    type: [HintsResponse],
  })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 401, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @Get("/all")
  findAllHintsForUser(@Req() req) {
    const user = req.user;
    return this.hintsService.findAllHintsForUser(user);
  }

  @ApiOperation({ summary: "Delete hint with id" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "hintId",
    type: Number,
    description: "Hint id for deletion",
  })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete("/:hintId")
  removeHintForUser(@Req() req, @Param("hintId", ParseIntPipe) hintId: number) {
    const user = req.user;
    return this.hintsService.removeHintForUser(user, hintId);
  }
}
