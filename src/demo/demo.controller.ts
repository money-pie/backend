import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";
import {
  Category,
  EngCategory,
  EngKind,
  EngMonth,
  Kind,
  Month,
} from "src/transactions/transactions.constants";
import { DemoService } from "./demo.service";
import {
  DemoInfoListResponse,
  DemoListTransactionsResponse,
  DemoTransactionResponse,
  DemoUserResponse,
} from "./response/demo.responses";

@ApiTags("Demo endpoints")
@Controller("demo")
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @ApiOperation({ summary: "Get demo user" })
  @ApiResponse({
    status: 200,
    description: "Demo user info",
    type: DemoUserResponse,
  })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @Get("/user")
  findUsr() {
    return this.demoService.findOneUsr();
  }

  @ApiOperation({ summary: "Get demo transaction by id" })
  @ApiParam({
    name: "id",
    type: String,
    description: "Transaction id",
  })
  @ApiResponse({
    status: 200,
    description: "Demo transaction",
    type: DemoTransactionResponse,
  })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @Get("/:id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.demoService.findOneById(id);
  }

  @ApiOperation({ summary: "Get demo list of transactions" })
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transaction to show",
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: "List of demo transactions",
    type: [DemoTransactionResponse],
  })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @Get("/all/:personal")
  findAll(@Param("personal", ParseBoolPipe) personal: boolean) {
    return this.demoService.findAll(personal);
  }

  @ApiOperation({
    summary: "Get demo filtered list of transactions",
  })
  @ApiParam({
    name: "personal",
    type: Boolean,
    description: "Personal or group transaction to show",
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
    description: "Filtered list of demo transactions",
    type: DemoListTransactionsResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @Get("/sort/:personal/:category/:month/:year")
  findAllFiltered(
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("category", new ParseEnumPipe(EngCategory)) category: EngCategory,
    @Param("month", new ParseEnumPipe(EngMonth)) month: EngMonth,
    @Param("year", ParseIntPipe) year: number,
  ) {
    return this.demoService.findAllFiltered(personal, category, month, year);
  }

  @ApiOperation({ summary: "Get info about demo transactions with filters" })
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
    description: "List of demo transactions info",
    type: DemoInfoListResponse,
  })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @Get("/categories-info/:personal/:kind/:month/:year")
  findInfo(
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("kind", new ParseEnumPipe(EngKind)) kind: EngKind,
    @Param("month", new ParseEnumPipe(EngMonth)) month: EngMonth,
    @Param("year", ParseIntPipe) year: number,
  ) {
    return this.demoService.findInfo(personal, kind, month, year);
  }
}
