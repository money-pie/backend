import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { HintsService } from "./hints.service";

@ApiTags("Hints endpoints")
@Controller("hints")
export class HintsController {
  constructor(private readonly hintsService: HintsService) {}

  @ApiOperation({ summary: "Get list of hints for user" })
  @UseGuards(JwtAuthGuard)
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
  @Delete("/:hintId")
  removeHintForUser(@Req() req, @Param("hintId", ParseIntPipe) hintId: number) {
    const user = req.user;
    return this.hintsService.removeHintForUser(user, hintId);
  }
}
