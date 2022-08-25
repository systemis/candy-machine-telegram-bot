import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommandService } from './command.service';
import { BotModule } from '../bot/bot.module';

@Module({
  providers: [CommandService],
  imports: [ConfigModule, BotModule],
})
export class CommandModule {}
