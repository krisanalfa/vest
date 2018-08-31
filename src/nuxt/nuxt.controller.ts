import { Controller, Get, Req, Res } from "@nestjs/common";
import { NuxtService } from "./nuxt.service";

@Controller("*")
export class NuxtController {
  public constructor(private readonly nuxtService: NuxtService) {}

  @Get()
  public async index(@Req() req, @Res() reply) {
    await this.nuxtService.render(req.raw, reply.res);
  }
}
