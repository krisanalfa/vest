import { Test, TestingModule } from "@nestjs/testing";
import { NuxtController } from "./nuxt.controller";
import { NuxtService } from "./nuxt.service";

describe("Nuxt Controller", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NuxtController],
      providers: [NuxtService],
    }).compile();
  });
  it("should be defined", () => {
    const controller: NuxtController = module.get<NuxtController>(NuxtController);
    expect(controller).toBeDefined();
  });
});
