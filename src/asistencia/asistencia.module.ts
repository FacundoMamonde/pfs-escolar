import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaService } from './asistencia.service';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaController } from './asistencia.controller';
import { ClaseEstudiante } from 'src/estudiante/entities/clase_estudiante.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Asistencia, ClaseEstudiante])],
    providers: [AsistenciaService],
    controllers: [AsistenciaController]
})
export class AsistenciaModule {}
