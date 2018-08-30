import { INestApplication } from '@nestjs/common'
import { NestFactory, FastifyAdapter } from '@nestjs/core'
import { Nuxt } from 'nuxt'
import { resolve } from 'path'

import { NuxtFactory } from './../nuxtjs'
import { StartupConfiguration } from './bootstrap.interfaces'

export class Bootstrap {
  private readonly env = process.env.NODE_ENV || 'development'
  private readonly port = process.env.PORT || '3000'
  private readonly server: FastifyAdapter = new FastifyAdapter()
  private app!: INestApplication
  private nuxt!: Nuxt

  constructor (private readonly config: StartupConfiguration) {}

  async main () {
    await this.configureNuxt()
    await this.configureNest()
  }

  private async configureNest () {
    this.app = await NestFactory.create(this.config.module, this.server)
    await this.app.listen(this.port)
    this.app.use(this.nuxt.render)
  }

  private async configureNuxt () {
    this.nuxt = await NuxtFactory.create({
      ...require(resolve('.', 'nuxt.config.js')),
      dev: this.env !== 'production'
    })
  }
}
