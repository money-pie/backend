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
  ParseEnumPipe,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Category, Month } from "./transactions.constants";

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
  @Get("/all/:personal")
  findAll(@Req() req, @Param("personal", ParseBoolPipe) personal: boolean) {
    const user = req.user;
    return this.transactionsService.findAll(user, personal);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:personal/:page/:limit")
  findAllPagination(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number,
  ) {
    const user = req.user;
    return this.transactionsService.findAllPagination(
      user,
      personal,
      page,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all/:personal/:page/:limit/:category/:month/:year")
  findAllFiltered(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number,
    @Param("category", new ParseEnumPipe(Category)) category: Category,
    @Param("month", new ParseEnumPipe(Month)) month: Month,
    @Param("year", ParseIntPipe) year: number,
  ) {
    const user = req.user;
    return this.transactionsService.findAllFiltered(
      user,
      personal,
      page,
      limit,
      category,
      month,
      year,
    );
  }

  //TODO получение информации за определенный месяц вида: {Категория, количество трат в категории, сумма трат}
}
