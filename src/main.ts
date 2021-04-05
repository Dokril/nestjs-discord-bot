import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.init();
}
// tslint:disable-next-line: no-floating-promises
bootstrap();
