import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CandyMachineStatusService } from './candy-machine-status.service';
import { BotModule } from '../bot/bot.module';
import { GetCandyMachineStatusProvider } from '../providers/get-candy-machine-status.provider';

@Module({
  providers: [GetCandyMachineStatusProvider, CandyMachineStatusService],
  imports: [ConfigModule, BotModule],
})
export class CandyMachineStatusModule {}
