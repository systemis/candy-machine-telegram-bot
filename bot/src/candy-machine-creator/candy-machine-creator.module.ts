import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BotModule } from '../bot/bot.module';
import { CandyMachineCreatorService } from './candy-machine-creator.service';
import { SPLTokenProvider } from '../providers/spl-token.provider';
import { CandyMachineProvider } from '../providers/candy-machine.provider';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [
    CandyMachineProvider,
    SPLTokenProvider,
    ConfigModule,
    CandyMachineCreatorService,
  ],
  imports: [LoggerModule, BotModule],
})
export class CandyMachineCreatorModule {}
