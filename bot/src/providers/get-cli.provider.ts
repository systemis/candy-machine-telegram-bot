import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class GetCLIProvider {
  public initilizeCLI() {
    return new Promise((resolve) => {
      exec(`sh ../candy-machine/install_packages.sh`, (error, stdout) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
          resolve(error);
        }
        resolve(stdout);
      });
    });
  }
}
