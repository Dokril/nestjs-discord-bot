import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { Client } from 'discord.js';
import { ConfigService } from 'nestjs-dotenv';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(private configService: ConfigService) {}
	logger = new Logger('Discord bot');
	private readonly client = new Client();

	async onModuleInit() {
		await this.client.login(this.configService.get('TOKEN'));
		this.start();
	}

	start() {
		this.client.on('ready', () => {
			this.logger.log(`Бот запущен на следующих серверах: ${this.client.guilds.cache.array().join(', ')}`);
		});
		this.client.on('message', (message) => {
			switch (message.channel.type) {
				case 'dm':
					this.logger.log(
						`Пользователь ${message.author.username} написал: ${message.content}`,
						'Личное сообщение'
					);
					break;
				case 'text':
					this.logger.log(
						`Пользователь ${message.author.username} написал: ${message.content}`,
						message.guild?.name
					);

				default:
					break;
			}
		});
	}
}
