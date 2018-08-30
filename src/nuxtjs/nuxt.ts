import { Builder, Nuxt, NuxtConfig } from "nuxt";

export class NuxtFactory {
  public static async create(nuxtConfig: NuxtConfig) {
    const nuxtInstance = new Nuxt(nuxtConfig);

    if (nuxtConfig.dev) {
      await new Builder(nuxtInstance).build();
    }

    return nuxtInstance;
  }
}
