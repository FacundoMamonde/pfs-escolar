import { Test, TestingModule } from '@nestjs/testing';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';

describe('CiudadController', () => {
  let controller: CiudadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadController],
      providers: [
        CiudadService,{provide: getRepositoryToken(Ciudad),useValue: {}},
      ],
    }).compile();

    controller = module.get<CiudadController>(CiudadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
