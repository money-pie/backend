import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Category, Kind, Month } from "src/transactions/transactions.constants";
import { DemoService } from "./demo.service";

@ApiTags("Demo endpoints")
@Controller("demo")
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @ApiOperation({ summary: "Get demo user" })
  @Get("/usr")
  findUsr() {
    return this.demoService.findOneUsr();
  }

  @ApiOperation({ summary: "Get demo transaction by id" })
  @Get("/:id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.demoService.findOneById(id);
  }

  @ApiOperation({ summary: "Get demo list of transactions" })
  @Get("/all/:personal")
  findAll(@Param("personal", ParseBoolPipe) personal: boolean) {
    return this.demoService.findAll();
  }

  @ApiOperation({
    summary: "Get demo filtered list of transactions with pagination",
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
