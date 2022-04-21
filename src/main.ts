import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};


async function bootstrap() {
  let app = null;
  if (process.env.SSL === 'enable') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ https: httpsOptions }),
      {
        httpsOptions,
      },
    );

  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();
  await app.listen(process.env.PORT, '0.0.0.0');
  console.log(`Application https:${process.env.SSL} is running on: ${await app.getUrl()}`);

}


bootstrap();
