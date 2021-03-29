import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DiscordModule } from 'discord-nestjs';

@Module({
	imports: [
		DiscordModule.forRoot({
			token: 'ODE1ODYwMTkyMjc2NjQzODQw.YDyjAw.60LrBDFE8MDFmw5_7rTa-EUa9IU',
			commandPrefix: '!',
			allowCommands: [
				{
					name: 'random',
				},
			],
		}),
	],
	providers: [AppService],
})
export class AppModule {}
