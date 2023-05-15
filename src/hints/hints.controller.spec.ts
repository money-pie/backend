import { Test, TestingModule } from "@nestjs/testing";
import { HintsController } from "./hints.controller";
import { HintsService } from "./hints.service";

describe("HintsController", () => {
  let controller: HintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HintsController],
      providers: [HintsService],
    }).compile();

    controller = module.get<HintsController>(HintsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
