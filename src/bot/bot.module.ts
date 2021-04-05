import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { DiscordModule } from 'discord-nestjs';
import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

@Module({
	imports: [
		DiscordModule.forRootAsync({
			useFactory: () => ({
				token: config.get('TOKEN'),
				commandPrefix: '!',
				allowCommands: [{ name: 'random' }, { name: 'yt' }, { name: 'say' }],
			}),
		}),
	],
	providers: [BotService],
})
export class BotModule {}
