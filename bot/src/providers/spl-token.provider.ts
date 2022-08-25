import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class SPLTokenProvider {
  async createSPLToken() {
    const tokenAddress = await new Promise((resolve) => {
      exec(`sh ../candy-machine/create_spl_token.sh 0`, (error, stdout) => {
        if (error !== null) throw new Error(`${error}`);
        resolve(stdout.split(' ')[2]?.split(`\n`)[0].trim());
      });
    });

    await new Promise((resolve) => {
      exec(`sh ../candy-machine/create_account.sh ${tokenAddress}`, () => {
        resolve(true);
      });
    });

    await new Promise((resolve) => {
      exec(`sh ../candy-machine/mint_spl_token.sh ${tokenAddress}`, () => {
        resolve(true);
      });
    });

    return tokenAddress;
  }
}
