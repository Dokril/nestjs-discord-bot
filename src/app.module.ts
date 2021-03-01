import { RMQModule } from 'nestjs-rmq';
import { getMongoConnect, getMongoOptions } from './configs/mongo.config';
import { ConfigService, ConfigModule } from 'nestjs-dotenv';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

const configService = new ConfigService();

@Module({
	imports: [ConfigModule.forRoot(), TypegooseModule.forRoot(getMongoConnect(configService), getMongoOptions())],
	providers: [AppService],
})
export class AppModule {}
