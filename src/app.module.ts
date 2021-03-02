import { RMQModule } from 'nestjs-rmq';
import { ConfigService } from 'nestjs-dotenv';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

const configService = new ConfigService();

@Module({
	providers: [AppService],
})
export class AppModule {}
