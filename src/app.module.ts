import { Module } from "@nestjs/common";
import { NuxtModule } from "./nuxt/nuxt.module";

@Module({
  imports: [NuxtModule],
})
export class AppModule {}
