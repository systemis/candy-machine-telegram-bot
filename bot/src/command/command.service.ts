import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotService } from '../bot/bot.service';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class CommandService implements OnModuleInit {
  private bot: TelegramBot;
  constructor(private botService: BotService) {
    this.bot = this.botService.getBot();
  }
  onModuleInit() {
    // Welcome message
    this.welcome();
  }

  welcome() {
    this.bot.onText(/\/start/, (msg) => {
      this.bot.sendMessage(
        msg.from.id,
        'Hello ' +
          msg.from.first_name +
          `, I'am bot from Ancient8, I can help you to use candy machine, Use following commands to use me !!! \n /status Lookup candy machine infomation \n /create Create new Candy Machine`,
      );
    });
  }
}
