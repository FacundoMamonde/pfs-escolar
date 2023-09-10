import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { DomicilioEstudiante } from './entities/domicilio_estudiante.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { ClaseEstudiante } from './entities/clase_estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Clase, DomicilioEstudiante, Ciudad, ClaseEstudiante])],
  controllers: [EstudianteController],
  providers: [EstudianteService]
})
export class EstudianteModule {}
