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
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/add")
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    const user = req.user;
    return this.transactionsService.create(createTransactionDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.transactionsService.findOneById(id);
  }
}
