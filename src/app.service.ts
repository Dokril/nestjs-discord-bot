import { Injectable, OnModuleInit } from '@nestjs/common';

import { Client } from 'discord.js';

@Injectable()
export class AppService implements OnModuleInit {
	constructor() {}

	onModuleInit() {
		this.start();
	}

	start() {
		const client = new Client();
		client.login('ODE1ODYwMTkyMjc2NjQzODQw.YDyjAw.60LrBDFE8MDFmw5_7rTa-EUa9IU');
		client.on('message', (message) => {
			console.log(message.author.username, message.content);
		});
	}
}
