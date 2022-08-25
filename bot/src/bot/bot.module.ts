import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { GetCLIProvider } from '../providers/get-cli.provider';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [GetCLIProvider, BotService],
  imports: [ConfigModule, LoggerModule],
  exports: [BotService],
})
export class BotModule {}
