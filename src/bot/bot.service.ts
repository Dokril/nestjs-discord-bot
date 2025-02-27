import { Injectable, Logger } from '@nestjs/common';
import { Message, VoiceChannel, VoiceState } from 'discord.js';
import { DiscordClientProvider, On, Once, OnCommand } from 'discord-nestjs';
import { randomInteger } from '../common-func';
import * as discordTTS from 'discord-tts';
import * as ytdl from 'ytdl-core';

@Injectable()
export class BotService {
	private readonly logger = new Logger(BotService.name);
	constructor(private readonly discordProvider: DiscordClientProvider) {}

	@Once({ event: 'ready' })
	onceReady(): void {
		this.logger.log(`The bot is launched: ${this.discordProvider.getClient().guilds.cache.array().join(', ')}`);
	}

	@OnCommand({ name: 'random', channelType: ['text'] })
	async random(message: Message): Promise<void> {
		await message.reply(randomInteger(1, 1000));
	}

	@OnCommand({ name: 'yt', channelType: ['text'], isRemovePrefix: true })
	async yt(message: Message): Promise<void> {
		await this.startYTSound(message.member.voice.channel, message.content);
	}

	@OnCommand({ name: 'say', channelType: ['text'], isRemovePrefix: true })
	async say(message: Message): Promise<void> {
		await this.sendVoiceMessageInChannel(message.member.voice.channel, message.content.replace('!say', ''));
	}

	@On({ event: 'voiceStateUpdate' })
	async onVoiceStateUpdate(
		{ member: oldMemeber, channel: oldChannel }: VoiceState,
		{ member: newMemeber, channel: newChannel }: VoiceState
	) {
		if (!oldChannel && newChannel) {
			this.logger.log('Join ' + newChannel.name, oldMemeber.user.username);
			await this.sendVoiceMessageInChannel(newChannel, 'Пришел мой любимый ' + newMemeber.user.username);
		} else if (!newChannel) {
			this.logger.log('Left ' + oldChannel.name, oldMemeber.user.username);
		}
	}

	async sendVoiceMessageInChannel(channel: VoiceChannel, message: string) {
		const connection = await channel.join();
		const dispacher = connection.play(discordTTS.getVoiceStream(message, 'ru-RU'));
		dispacher.on('finish', () => channel.leave());
	}

	async startYTSound(channel: VoiceChannel, url: string) {
		const connection = await channel.join();
		const dispacher = connection.play(ytdl(url, { filter: 'audioonly' }));
		dispacher.on('finish', () => channel.leave());
	}
}
