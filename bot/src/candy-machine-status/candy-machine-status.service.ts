import { Injectable, OnModuleInit } from '@nestjs/common';
import { GetCandyMachineStatusProvider } from '../providers/get-candy-machine-status.provider';
import { BotService } from '../bot/bot.service';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class CandyMachineStatusService implements OnModuleInit {
  private bot: TelegramBot;
  constructor(
    private candyMachineStatusProvider: GetCandyMachineStatusProvider,

    private botService: BotService,
  ) {
    this.bot = this.botService.getBot();
  }

  onModuleInit() {
    this.getCandyMachineStatus();
  }

  async getCandyMachineStatus() {
    this.bot.onText(/\/status/, (msg) => {
      this.bot.sendMessage(msg.from.id, 'candy machine id: ');
      this.bot.on('message', async (msg) => {
        const candyMachineId = msg.text;
        this.bot.sendMessage(
          msg.from.id,
          `Please wait a moment for the result`,
        );

        const status =
          await this.candyMachineStatusProvider.getCandyMachineStatus(
            candyMachineId,
          );

        this.bot.sendMessage(
          msg.from.id,
          `Status of candy machine following the ID ${candyMachineId}: ${status}`,
        );
      });
    });
  }
}
