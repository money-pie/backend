import { Injectable } from "@nestjs/common";
import { CreateHintDto } from "./dto/create-hint.dto";
import { UpdateHintDto } from "./dto/update-hint.dto";

@Injectable()
export class HintsService {
  create(createHintDto: CreateHintDto) {
    return "This action adds a new hint";
  }

  findAll() {
    return `This action returns all hints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hint`;
  }

  update(id: number, updateHintDto: UpdateHintDto) {
    return `This action updates a #${id} hint`;
  }

  remove(id: number) {
    return `This action removes a #${id} hint`;
  }
}
