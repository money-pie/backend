import { Controller, Get, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @Delete("/:hintId")
  removeHintForUser(@Req() req, @Param("hintId") hintId: number) {
    const user = req.user;
    return this.hintsService.removeHintForUser(user, hintId);
  }
}
