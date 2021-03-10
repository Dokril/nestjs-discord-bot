import { Injectable, Logger } from '@nestjs/common';
import { Message, VoiceChannel, VoiceState } from 'discord.js';
import { DiscordClientProvider, On, Once, OnCommand } from 'discord-nestjs';
import { randomInteger } from './common-func';
import * as discordTTS from 'discord-tts';
@Injectable()
export class AppService {
	private readonly logger = new Logger(AppService.name);
	constructor(private readonly discordProvider: DiscordClientProvider) {}

	@Once({ event: 'ready' })
	onceReady(): void {
		this.logger.log(
			`Бот запущен на следующих серверах: ${this.discordProvider.getClient().guilds.cache.array().join(', ')}`
		);
	}

	@OnCommand({ name: 'random', channelType: ['text'] })
	async onCommand(message: Message): Promise<void> {
		await message.reply(randomInteger(1, 1000));
	}

	@On({ event: 'voiceStateUpdate' })
	async onVoiceStateUpdate({ member: oldM, channel: oldC }: VoiceState, { member: newM, channel: newC }: VoiceState) {
		if (!oldC && newC) {
			this.logger.log('Зашел на ' + newC.name, oldM.user.username);
			await this.sendVoiceMessage(newC, 'Пришел мой любимый ' + newM.user.username);
		} else if (!newC) {
			this.logger.log('Вышел из ' + oldC.name, oldM.user.username);
		}
	}

	async sendVoiceMessage(channel: VoiceChannel, message: string) {
		const connection = await channel.join();
		const dispacher = connection.play(discordTTS.getVoiceStream(message, 'ru-RU'));
		dispacher.on('finish', () => channel.leave());
	}
}
