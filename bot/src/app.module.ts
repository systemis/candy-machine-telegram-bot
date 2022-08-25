import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { CommandModule } from './command/command.module';
import { CandyMachineStatusModule } from './candy-machine-status/candy-machine-status.module';
import { GetCLIProvider } from './providers/get-cli.provider';
import { CandyMachineCreatorModule } from './candy-machine-creator/candy-machine-creator.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    BotModule,
    CommandModule,
    CandyMachineStatusModule,
    CandyMachineCreatorModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [GetCLIProvider, AppService],
})
export class AppModule {}
