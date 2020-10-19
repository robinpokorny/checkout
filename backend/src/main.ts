import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as compression from 'compression';
import { createLightship } from 'lightship';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ConfigService } from './common/config/config.service';
import {
  SERVICE_CONFIG,
  SERVER_CONFIG,
  DOCS_CONFIG,
} from './common/config/config.const';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpAdapter();
  const configService = app.get(ConfigService);
  const loggerService = await app.resolve(LoggerService);
  loggerService.setContext('NestApplication!!!');

  const name = <string>configService.get(SERVICE_CONFIG.NAME);
  const desc = <string>configService.get(SERVICE_CONFIG.DESCRIPTION);
  const version = <string>configService.get(SERVICE_CONFIG.VERSION);
  const baseUrl = <string>configService.get(SERVICE_CONFIG.BASE_URL);
  const docsUrl = <string>configService.get(DOCS_CONFIG.BASE_URL);
  const docsUser = {
    [<string>configService.get(DOCS_CONFIG.USERNAME)]: <string>(
      configService.get(DOCS_CONFIG.PASSWORD)
    ),
  };
  const port = <number>configService.get(SERVER_CONFIG.PORT);

  app.enableCors();
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix(baseUrl);
  app.useGlobalPipes(new ValidationPipe());
  app.use(docsUrl, basicAuth({ challenge: true, users: docsUser }));

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${desc} | [swagger.json](swagger.json)`)
    .setVersion(version)
    // .addBearerAuth({
    //   type: 'http',
    //   name: 'authorization',
    //   bearerFormat: 'JWT',
    // })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync(
    `${process.cwd()}/swagger.json`,
    JSON.stringify(document, null, 2),
    { encoding: 'utf8' },
  );
  server.get(`${docsUrl}/swagger.json`, (_req, res) => {
    res.json(document);
  });
  SwaggerModule.setup(docsUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  const lightship = createLightship();
  lightship.registerShutdownHandler(() => {
    setTimeout(
      () => app.close().catch(err => loggerService.error(err)),
      Number(configService.get('shutdownDelay')) || 5000,
    );
  });

  try {
    await app.listen(port);
    lightship.signalReady();
    loggerService.log(`API endpoints are ready on port (${port})`);
  } catch (error) {
    loggerService.error('Unable to lunch the API', error);
  }
}
bootstrap();
