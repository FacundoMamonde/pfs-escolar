import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase, Profesor, Estudiante, Escuela])],
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {}
