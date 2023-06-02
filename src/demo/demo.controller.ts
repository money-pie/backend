import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Category, Kind, Month } from "src/transactions/transactions.constants";
import { DemoService } from "./demo.service";

@ApiTags("Demo endpoints")
@Controller("demo")
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @ApiOperation({ summary: "Get demo user" })
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
  @Get("/all/:personal")
  findAll(@Param("personal", ParseBoolPipe) personal: boolean) {
    return this.demoService.findAll();
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
  @Get("/sort/:personal/:category/:month/:year")
  findAllFiltered(
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("category", new ParseEnumPipe(Category)) category: Category,
    @Param("month", new ParseEnumPipe(Month)) month: Month,
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
    @Param("personal", ParseBoolPipe) personal: boolean,
    @Param("kind", new ParseEnumPipe(Kind)) kind: Kind,
    @Param("month", new ParseEnumPipe(Month)) month: Month,
    @Param("year", ParseIntPipe) year: number,
  ) {
    return this.demoService.findInfo(personal, kind, month, year);
  }
}
