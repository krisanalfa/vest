import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import * as puppeteer from "puppeteer";
import { AppModule } from "./../src/app.module";

describe("HomePage (e2e)", () => {
  jest.setTimeout(60000);
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());

    await app.init();
    await app.listen(3000);
  });

  afterAll(async () => {
    return await app.close();
  });

  test("/ (GET)", async (done) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".hello > h1");

    const html = await page.$eval(".hello > h1", (e) => e.innerHTML);
    expect(html).toBe("Welcome");
    done();
  });

  afterAll(() => app.close());
});
