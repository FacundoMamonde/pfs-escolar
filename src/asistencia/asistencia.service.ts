import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaDto } from './dto/asistencia.dto';
import { ClaseEstudiante } from 'src/estudiante/entities/clase_estudiante.entity';


@Injectable()
export class AsistenciaService {

    constructor(
        @InjectRepository(Asistencia)
        private readonly asistenciaRepository: Repository<Asistencia>,
        @InjectRepository(ClaseEstudiante)
        private readonly claseEstudianteRepository: Repository<ClaseEstudiante>,
    ) { }

    async newAsistencia(asistenciaDto: AsistenciaDto) {
        try {
            let asistencia = new Asistencia(asistenciaDto.fecha,asistenciaDto.asistencia);

            const criterioClaseEstudiante:FindOneOptions = {where:{id:asistenciaDto.idClaseEstudiante}};
            let claseEstudiante = await this.claseEstudianteRepository.findOne(criterioClaseEstudiante);
            if(!claseEstudiante){throw new Error('No se encontro la Clase-Estudiante')};
            asistencia.claseEstudiante = claseEstudiante;

            let saveAsistencia = await this.asistenciaRepository.save(asistencia);
            if (!saveAsistencia){throw new Error('No se pudo guardar la asistencia')};

            return saveAsistencia;
        } catch (error) {
            throw new HttpException(
                { status: HttpStatus.NOT_FOUND, error: `${error}` },
                HttpStatus.NOT_FOUND);
        }
    }
}
