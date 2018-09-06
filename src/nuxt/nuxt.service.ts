import { Injectable, OnModuleInit } from "@nestjs/common";
import { IncomingMessage, ServerResponse } from "http";
import { Builder, Nuxt } from "nuxt";

@Injectable()
export class NuxtService implements OnModuleInit {
  private nuxt: any;

  public async onModuleInit(): Promise<any> {
    const dev = ["local", "testing"].indexOf(process.env.NODE_ENV) !== -1;

    await this.build(dev);
  }

  public build(dev: boolean = false): Promise<boolean> {
    this.nuxt = new Nuxt(Object.assign({ dev }, require("./../../nuxt.config")));

    return dev
      ? new Builder(this.nuxt).build()
      : new Promise((resolve) => resolve(true));
  }

  public render(req: IncomingMessage, res: ServerResponse) {
    return this.nuxt.render(req, res);
  }
}
