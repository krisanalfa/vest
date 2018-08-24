import * as puppeteer from 'puppeteer';
import { Test } from '@nestjs/testing';
import { FastifyAdapter } from '@nestjs/core'
import { NuxtFactory } from './../src/nuxtjs';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('HomePage (e2e)', () => {
  let app: INestApplication;
  let nuxt: any;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());

    await app.init();
    await app.listen(3000);

    nuxt = await NuxtFactory.create({
      ...require('./../nuxt.config'),
      dev: false
    })
    app.use(nuxt.render);
  });

  test('/ (GET)', async done => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.hello > h1');

    const html = await page.$eval('.hello > h1', e => e.innerHTML);
    expect(html).toBe('Welcome');
    done();
  });

  afterAll(() => app.close());
});
