import { AppModule } from './app.module'
import { Bootstrap } from './bootstrap'

(async () =>
  new Bootstrap({
    module: AppModule
  }).main())().catch(e => {
  // tslint:disable-next-line:no-console
    console.error(e)
    process.exit(1)
  })
