import { Injectable } from "@nestjs/common";

@Injectable()
export class HintsService {
  findAll() {
    return `This action returns all hints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hint`;
  }

  remove(id: number) {
    return `This action removes a #${id} hint`;
  }
}
