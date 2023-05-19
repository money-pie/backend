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
  ParseBoolPipe,
  ParseIntPipe,
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
  create(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const user = req.user;
    return this.transactionsService.create(user, createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  findOne(@Req() req, @Param("id") id: string) {
    const user = req.user;
    return this.transactionsService.findOneById(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:personal/:page/:limit")
  findAll(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number,
  ) {
    const user = req.user;
    return this.transactionsService.findAll(user, personal, page, limit);
  }
}
