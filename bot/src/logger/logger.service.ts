import { Injectable, Logger as NestLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {
  error_(message: any, trace?: string, context?: string) {
    // TO DO
    super.error(message, trace, context);
  }

  error(message: any, ...optionnalParams: []) {
    super.error(message, optionnalParams);
  }

  warn(message: any, context?: string) {
    // TO DO
    super.warn(message, context);
  }

  log(message: any, ...optionnalParams: any[]) {
    // TO DO
    super.log(message, optionnalParams);
  }

  debug(message: any, context?: string) {
    // TO DO
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    // TO DO
    super.verbose(message, context);
  }
}
