import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class GetCandyMachineStatusProvider {
  public getCandyMachineStatus(candyMachineId: string) {
    return new Promise((resolve) => {
      console.log('Get candy machine status: ', candyMachineId);
      exec(
        `sh ../candy-machine/show_candy_machine.sh ${candyMachineId}`,
        (error, stdout) => {
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
          resolve(stdout);
        },
      );
    });
  }
}
