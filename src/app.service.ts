import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class AppService implements OnModuleInit {
	constructor() {}
	logger = new Logger('Discord bot');
	private readonly client = new Client();

	async onModuleInit() {
		await this.client.login(
			'ODE1ODYwMTkyMjc2NjQzODQw.YDyjAw.60LrBDFE8MDFmw5_7rTa-EUa9IU'
		);
		this.start();
	}

	start() {
		this.client.on('ready', () => {
			this.logger.log(
				`Бот запущен на следующих серверах: ${this.client.guilds.cache
					.array()
					.join(', ')}`
			);
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
