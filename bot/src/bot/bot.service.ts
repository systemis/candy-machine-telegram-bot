import TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Logger } from '../logger/logger.service';

@Injectable()
export class BotService {
  private bot: TelegramBot;

  constructor(private configService: ConfigService, private logger: Logger) {
    /** @description Initialize telegram bot */
    this.initBot();
  }

  private initBot() {
    this.logger.log('Initialize Bot');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TelegramBot = require('node-telegram-bot-api');
    this.bot = new TelegramBot(this.configService.get('TELEGRAM_TOKEN'), {
      polling: true,
    });
  }

  public getBot() {
    return this.bot;
  }
}
