import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
@Module({
	imports: [BotModule, ConfigModule.forRoot()],
})
export class AppModule {}
