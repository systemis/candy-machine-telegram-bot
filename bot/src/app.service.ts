import { Injectable } from '@nestjs/common';
import { GetCLIProvider } from './providers/get-cli.provider';
import { Logger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private cliProvider: GetCLIProvider, private logger: Logger) {
    /** @description Initialize solana CLI and SPL token CLI & install required packages for metaplex */
    this.initSolanaCLI();
  }

  getHello(): string {
    return 'Hello World!';
  }

  private async initSolanaCLI() {
    this.logger.log('Initialize CLI...');
    const cliConfig = await this.cliProvider.initilizeCLI();
    this.logger.log('CLI Config: ', cliConfig);
  }
}
