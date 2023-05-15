import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HintsService } from "./hints.service";
import { CreateHintDto } from "./dto/create-hint.dto";
import { UpdateHintDto } from "./dto/update-hint.dto";

@Controller("hints")
export class HintsController {
  constructor(private readonly hintsService: HintsService) {}

  @Post()
  create(@Body() createHintDto: CreateHintDto) {
    return this.hintsService.create(createHintDto);
  }

  @Get()
  findAll() {
    return this.hintsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.hintsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHintDto: UpdateHintDto) {
    return this.hintsService.update(+id, updateHintDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.hintsService.remove(+id);
  }
}
