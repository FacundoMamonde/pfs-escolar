import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { Profesor } from './entities/profesor.entity';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomicilioProfesor } from './entities/domicilio_profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, DomicilioProfesor, Ciudad])],
  controllers: [ProfesorController],
  providers: [ProfesorService]
})
export class ProfesorModule {}
