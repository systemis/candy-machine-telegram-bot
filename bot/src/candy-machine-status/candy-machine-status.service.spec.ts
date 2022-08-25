import { Test, TestingModule } from '@nestjs/testing';
import { CandyMachineStatusService } from './candy-machine-status.service';

describe('CandyMachineStatusService', () => {
  let service: CandyMachineStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandyMachineStatusService],
    }).compile();

    service = module.get<CandyMachineStatusService>(CandyMachineStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
