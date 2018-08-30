import { AppModule } from "./app.module";
import { Bootstrap } from "./bootstrap";

const app = new Bootstrap({
  module: AppModule,
});

app.main().catch((e) => {
  process.exit(1);
});
