/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
import { Injectable } from '@nestjs/common';
import { SalesConfigEntity } from '../entities/sales-config.entity';
import { exec } from 'child_process';

@Injectable()
export class CandyMachineProvider {
  private config: any = {};

  initConfig() {
    this.config = {
      price: 0,
      number: 1000,
      gatekeeper: null,
      solTreasuryAccount: 'EyJDaBk7A7oxPwR2o34UrhdguxxWkvntiArCRzGLAFe4',
      splTokenAccount: null,
      splToken: null,
      goLiveDate: '6 Feb 2022 00:00:00 GMT',
      endSettings: null,
      whitelistMintSettings: null,
      hiddenSettings: null,
      storage: 'arweave',
      ipfsInfuraProjectId: null,
      ipfsInfuraSecret: null,
      awsS3Bucket: null,
      noRetainAuthority: false,
      noMutable: false,
    };
  }

  generateMachineConfig(saleConfigDto: SalesConfigEntity) {
    this.initConfig();

    this.config.price = saleConfigDto.price;
    this.config.number = saleConfigDto.number;
    this.config.goLiveDate = saleConfigDto.goLiveDate;

    if (saleConfigDto.endDate) {
      this.config.endSettings = {
        endSettingType: { date: true },
        value: saleConfigDto.endDate,
      };
    }

    if (saleConfigDto.token) {
      this.config.whitelistMintSettings = {
        mode: { burnEveryTime: true },
        mint: saleConfigDto.token,
        presale: false,
        discountPrice: null,
      };
    }

    return this.config;
  }

  generateSaleConfigFile(filename, machineConfig) {
    return new Promise((resolve) => {
      console.log('Write to file', filename);
      fs.writeFile(filename, JSON.stringify(machineConfig), (err) => {
        if (err) return resolve(err);
        resolve(true);
      });
    });
  }

  create_candy_machine(config_file, name) {
    return new Promise((resolve) => {
      exec(
        `sh ../candy-machine/create_candy_machine.sh ${config_file} ${name}`,
        (error, stdout) => {
          console.log(stdout);
          if (error !== null) {
            console.log(error);
            resolve(error);
          }
          resolve(stdout);
        },
      );
    });
  }
}
