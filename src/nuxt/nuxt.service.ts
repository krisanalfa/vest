import { Injectable, OnModuleInit } from "@nestjs/common";
import { IncomingMessage, ServerResponse } from "http";
import { Builder, Nuxt } from "nuxt";

@Injectable()
export class NuxtService implements OnModuleInit {
  private nuxt: any;

  public async onModuleInit(): Promise<any> {
    await this.build();
  }

  public build(dev: boolean = false): Promise<boolean> {
    this.nuxt = new Nuxt(Object.assign({ dev }, require("./../../nuxt.config")));

    return dev
      ? new Promise((resolve) => resolve(true))
      : new Builder(this.nuxt).build();
  }

  public render(req: IncomingMessage, res: ServerResponse) {
    return new Promise((resolve, reject) => {
      this.nuxt.render(req, res, resolve, reject);
    });
  }
}
