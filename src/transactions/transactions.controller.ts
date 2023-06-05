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
import {
  Category,
  EngCategory,
  EngKind,
  EngMonth,
  Kind,
  Month,
} from "./transactions.constants";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";
import {
  InfoListResponse,
  ListTransactionsResponse,
  TransactionResponse,
} from "./response/transactions.responses";

@ApiTags("Transactions endpoints")
@ApiBearerAuth()
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: "Add a transaction" })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: "Created transaction",
    type: TransactionResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
  @ApiResponse({
    status: 200,
    description: "Found transaction",
    type: TransactionResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
  @ApiResponse({
    status: 200,
    description: "List of transactions",
    type: [TransactionResponse],
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
  @ApiResponse({
    status: 200,
    description: "List of transactions with pagination",
    type: [TransactionResponse],
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
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
    name: "category",
    type: String,
    description: "Category of transaction",
    example: "products",
  })
  @ApiParam({
    name: "month",
    type: String,
    description: "The first three letters of the month",
    example: "may",
  })
  @ApiParam({
    name: "year",
    type: Number,
    description: "Year to filter",
    example: 2023,
  })
  @ApiResponse({
    status: 200,
    description: "Filtered list of transactions with pagination",
    type: ListTransactionsResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Get("/sort/:personal/:category/:month/:year")
  findAllFiltered(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("category", new ParseEnumPipe(EngCategory)) category: EngCategory,
    @Param("month", new ParseEnumPipe(EngMonth)) month: EngMonth,
    @Param("year", ParseIntPipe) year: number,
  ) {
    const user = req.user;
    return this.transactionsService.findAllFiltered(
      user,
      personal,
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
    description: "Income or costs",
    example: "costs",
  })
  @ApiParam({
    name: "month",
    type: String,
    description: "The first three letters of the month",
    example: "may",
  })
  @ApiParam({
    name: "year",
    type: Number,
    description: "Year to filter",
    example: 2023,
  })
  @ApiResponse({
    status: 200,
    description: "List of transactions info",
    type: InfoListResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Get("/categories-info/:personal/:kind/:month/:year")
  findInfo(
    @Req() req,
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("kind", new ParseEnumPipe(EngKind)) kind: EngKind,
    @Param("month", new ParseEnumPipe(EngMonth)) month: EngMonth,
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
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Delete("/:id")
  deleteCosts(@Req() req, @Param("id", ParseUUIDPipe) id: string) {
    const user = req.user;
    return this.transactionsService.remove(user, id);
  }
}
