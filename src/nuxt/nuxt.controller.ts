import { Controller, Get, Req, Res } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import { NuxtService } from "./nuxt.service";

@Controller("*")
export class NuxtController {
  public constructor(private readonly nuxtService: NuxtService) {}

  @Get()
  public index(
    @Req() req: FastifyRequest<IncomingMessage>,
    @Res() reply: FastifyReply<ServerResponse>,
  ) {
    this.nuxtService.render(req.raw, reply.res);
  }
}
