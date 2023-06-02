import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseBoolPipe,
  ParseIntPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Category, Kind, Month } from "./transactions.constants";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Transactions endpoints")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: "Add a transaction" })
  @UseGuards(JwtAuthGuard)
  @Post("/add")
  create(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    const user = req.user;
    return this.transactionsService.create(user, createTransactionDto);
  }

  @ApiOperation({ summary: "Get transaction by id" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "id",
    type: String,
    description: "Transaction id",
  })
  @Get("/:id")
  findOne(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.transactionsService.findOneById(user, id);
  }

  @ApiOperation({ summary: "Get list of transactions" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transactions",
    example: true,
  })
  @Get("/all/:personal")
  findAll(@Req() req, @Param("personal", ParseBoolPipe) personal: boolean) {
    const user = req.user;
    return this.transactionsService.findAll(user, personal);
  }

  @ApiOperation({ summary: "Get list of transactions with pagination" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transactions",
  })
  @ApiParam({
    name: "page",
    type: Number,
    description: "Number of page",
    example: 1,
  })
  @ApiParam({
    name: "limit",
    type: Number,
    description: "Limit post per page",
    example: 5,
  })
  @Get("/all-pag/:personal/:page/:limit")
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

  @ApiOperation({
    summary: "Get filtered list of transactions with pagination",
  })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transactions",
    example: true,
  })
  @ApiParam({
    name: "page",
    type: Number,
    description: "Number of page",
    example: 1,
  })
  @ApiParam({
    name: "limit",
    type: Number,
    description: "Limit post per page",
    example: 5,
  })
  @ApiParam({
    name: "category",
    type: String,
    description: "Category of transaction",
    example: "Продукты",
  })
  @ApiParam({
    name: "month",
    type: String,
    description: "Month in MM format",
    example: "05",
  })
  @ApiParam({
    name: "year",
    type: Number,
    description: "Year to filter",
    example: 2023,
  })
  @Get("/sort/:personal/:page/:limit/:category/:month/:year")
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

  @ApiOperation({ summary: "Get info about transactions with filters" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transaction to show",
    example: true,
  })
  @ApiParam({
    name: "kind",
    type: String,
    description: "Income or hosts",
    example: "Расходы",
  })
  @ApiParam({
    name: "month",
    type: String,
    description: "Month in MM format",
    example: "05",
  })
  @ApiParam({
    name: "year",
    type: Number,
    description: "Year to filter",
    example: 2023,
  })
  @Get("/categories-info/:personal/:kind/:month/:year")
  findInfo(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("kind", new ParseEnumPipe(Kind)) kind: Kind,
    @Param("month", new ParseEnumPipe(Month)) month: Month,
    @Param("year", ParseIntPipe) year: number,
  ) {
    const user = req.user;
    return this.transactionsService.findInfo(user, personal, kind, month, year);
  }

  @ApiOperation({ summary: "Delete transaction" })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: "id",
    type: String,
    description: "Transaction id to deleting",
  })
  @Delete("/:id")
  deleteCosts(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.transactionsService.remove(user, id);
  }
}
