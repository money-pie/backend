import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { HintsService } from "./hints.service";

@ApiExcludeController()
@Controller("hints")
export class HintsController {
  constructor(private readonly hintsService: HintsService) {}

  @Get()
  findAll() {
    return this.hintsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hintsService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.hintsService.remove(+id);
  }
}
