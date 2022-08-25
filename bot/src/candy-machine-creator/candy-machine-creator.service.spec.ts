import { Test, TestingModule } from '@nestjs/testing';
import { CandyMachineCreatorService } from './candy-machine-creator.service';

describe('CandyMachineCreatorService', () => {
  let service: CandyMachineCreatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandyMachineCreatorService],
    }).compile();

    service = module.get<CandyMachineCreatorService>(
      CandyMachineCreatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
