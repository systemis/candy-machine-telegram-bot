// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotService } from '../bot/bot.service';
import { SalesConfigEntity } from '../entities/sales-config.entity';
import { SPLTokenProvider } from '../providers/spl-token.provider';
import { CandyMachineProvider } from '../providers/candy-machine.provider';
import { Logger } from '../logger/logger.service';

@Injectable()
export class CandyMachineCreatorService implements OnModuleInit {
  private bot: TelegramBot;

  private saleConfig: SalesConfigEntity;

  constructor(
    private botService: BotService,
    private splTokenProvider: SPLTokenProvider,
    private candyMachineProvider: CandyMachineProvider,
    private logger: Logger,
  ) {
    this.bot = this.botService.getBot();
  }

  onModuleInit() {
    /** @description On message to start flow */
    this.logger.log('on message');
    this.bot.onText(/\/create/, async (msg) => {
      try {
        this.saleConfig = {};

        this.handleStop();

        // Async to create white listed
        await this.handleCreateWhitelisted(msg);

        // Async to get name of candy machine
        await this.onName(msg);

        // Async to get price of each ft
        await this.onPrice(msg);

        // Async to get amount
        await this.onAmount(msg);

        // Async to get golive date
        await this.onGoliveDate(msg);

        // Async to get end date
        await this.onEndDate(msg);

        this.bot.sendMessage(
          msg.from.id,
          'Wait the moment to setting the configuration',
        );

        const machineConfig = this.candyMachineProvider.generateMachineConfig(
          this.saleConfig,
        );

        const filePath = path.join(
          path.dirname(require.main.filename),
          '../../',
          'candy-machine/',
          `${msg.from.id}${this.saleConfig.name}.json`,
        );

        this.logger.log(filePath);

        const result = await this.candyMachineProvider.generateSaleConfigFile(
          filePath,
          machineConfig,
        );

        this.logger.log('Result of sale config file', result);

        this.bot.sendMessage(
          msg.from.id,
          'Wait the moment to create new candy machine',
        );

        const candy_machine_info =
          await this.candyMachineProvider.create_candy_machine(
            filePath,
            this.saleConfig.name,
          );

        this.bot.sendMessage(msg.from.id, `${candy_machine_info}`);

        if (!(await this.bot.isPolling())) {
          await this.bot.startPolling();
        }
      } catch {}
    });
  }

  handleStop() {
    this.bot.on('message', (msg) => {
      if (msg.text === 'exit') {
        this.bot.stopPolling();
      }
    });
  }

  async handleCreateWhitelisted(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'yes',
              callback_data: JSON.stringify({
                command: 'whitelisted',
                base: 'y',
              }),
            },
            {
              text: 'no',
              callback_data: JSON.stringify({
                command: 'whitelisted',
                base: 'n',
              }),
            },
          ],
        ],
      },
    };

    this.bot.sendMessage(
      msg.chat.id,
      'Would you like to set the whitelisted setting for this machine',
      opts,
    );

    return new Promise((resolve) => {
      this.bot.on('callback_query', async (query) => {
        const data = JSON.parse(query.data);
        if (data.command === 'whitelisted') {
          if (data.base === 'n') {
            resolve(false);
          } else {
            this.bot.sendMessage(
              query.from.id,
              'Wait the moment to create SPL token...',
            );

            this.saleConfig.token =
              (await this.splTokenProvider.createSPLToken()) as string;

            this.bot.sendMessage(
              query.from.id,
              `Whitelisted token is: ${this.saleConfig.token}`,
            );

            resolve(this.saleConfig.token);
          }
        }
      });
    });
  }

  async onName(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    this.bot.sendMessage(msg.from.id, 'Name of candy machine: ');
    this.saleConfig.name = await new Promise((resolve) =>
      this.bot.on('message', (msg) => resolve(msg.text)),
    );
  }

  async onPrice(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    try {
      this.bot.sendMessage(msg.from.id, 'Price of each nft: ');
      this.saleConfig.price = await new Promise((resolve) =>
        this.bot.on('message', (msg) => resolve(Number.parseFloat(msg.text))),
      );
    } catch {}
  }

  async onAmount(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    try {
      this.bot.sendMessage(msg.from.id, 'Amount of nfts: ');
      this.saleConfig.number = await new Promise((resolve) =>
        this.bot.on('message', (msg) => resolve(Number.parseFloat(msg.text))),
      );
    } catch {}
  }

  async onGoliveDate(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    this.bot.sendMessage(msg.from.id, 'Golive date: ');
    this.saleConfig.goLiveDate = await new Promise((resolve) =>
      this.bot.on('message', (msg) => resolve(msg.text)),
    );
  }

  async onEndDate(msg: TelegramBot.Message) {
    if (!(await this.bot.isPolling())) return;
    this.bot.sendMessage(msg.from.id, 'End date: ');
    this.saleConfig.endDate = await new Promise((resolve) =>
      this.bot.on('message', (msg) => resolve(msg.text)),
    );
  }
}
