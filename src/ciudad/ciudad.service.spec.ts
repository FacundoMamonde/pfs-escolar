import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CiudadService', () => {
  let service: CiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadService,{provide: getRepositoryToken(Ciudad),useValue: {}},
      ],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
