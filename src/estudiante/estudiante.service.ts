import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteDTO } from './dto/estudiante.dto';
import { DomicilioEstudiante } from './entities/domicilio_estudiante.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { ClaseEstudiante } from './entities/clase_estudiante.entity';
import { InscripcionDTO } from './dto/inscripcion.dto';
import { Clase } from 'src/clase/entities/clase.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
        @InjectRepository(Ciudad)
        private readonly ciudadRepository: Repository<Ciudad>,
        @InjectRepository(DomicilioEstudiante)
        private readonly domicilioEstudianteRepository: Repository<DomicilioEstudiante>,
        @InjectRepository(Clase)
        private readonly claseRepository: Repository<Clase>,
        @InjectRepository(ClaseEstudiante)
        private readonly claseEstudianteRepository: Repository<ClaseEstudiante>,
    ) { }

    private errorNotFound(error) { // Funcion para no repetir tanto codigo
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: `${error}` },
          HttpStatus.NOT_FOUND)
    };
    
    async newEstudiante(estudianteDTO: EstudianteDTO): Promise<Estudiante> {
        try {
            let estudiante = new Estudiante(estudianteDTO.nombre, estudianteDTO.fechaNacimiento);
            const ciudadCriterio: FindOneOptions = { where: { id: estudianteDTO.idCiudad } };
            let ciudad = await this.ciudadRepository.findOne(ciudadCriterio);

            if (!ciudad) { throw new Error('No se encontró ciudad') };

            let estudianteDomicilio = new DomicilioEstudiante(estudianteDTO.domicilio);
            estudianteDomicilio.ciudad = ciudad;
            let domicilio = await this.domicilioEstudianteRepository.save(estudianteDomicilio);

            if (!domicilio) { throw new Error('No se pudo guardar el domicilio') };

            estudiante.domicilios = [estudianteDomicilio];
            let saveEstudiante = this.estudianteRepository.save(estudiante);

            if (!saveEstudiante) { throw new Error('No se pudo guardar el estudiante') };

            return saveEstudiante;

        } catch (error) {this.errorNotFound(error)};
    };

    public async getAllEstudiantes(): Promise<Estudiante[]> {
        try {
            let criterio: FindManyOptions = { relations: ['domicilios', 'domicilios.ciudad'] };
            const datos = await this.estudianteRepository.find(criterio);

            if (!datos) { throw new Error('No se pudo realizar la busqueda') };

            return datos;

        } catch (error) {this.errorNotFound(error)};
    };

    public async getEstudianteById(id: number) {
        try {
            const criterio: FindOneOptions = { where: { id: id }, relations: ['domicilios', 'domicilios.ciudad'] };
            let estudiante = this.estudianteRepository.findOne(criterio);

            if (!estudiante) { throw new Error('No se encontro estudiante con id: ' + id) };

            return estudiante

        } catch (error) {this.errorNotFound(error)};
    };

    public async newInscripcion(inscripcion: InscripcionDTO):Promise<ClaseEstudiante>{
        try{
            let claseEstudiante = new ClaseEstudiante();

            const criterioClase: FindOneOptions = {where:{id:inscripcion.idClase}};
            let clase = await this.claseRepository.findOne(criterioClase);
            if(!clase){throw new Error('No se encontro clase para inscribir')};
            claseEstudiante.clase = clase;

            const criterioEstudiante: FindOneOptions = {where:{id:inscripcion.idEstudiante}};
            let estudiante = await this.estudianteRepository.findOne(criterioEstudiante);
            if(!estudiante){throw new Error('No se encontro estudiante para inscribir')};

            claseEstudiante.estudiante = estudiante;

            let saveClaseEstudiante = this.claseEstudianteRepository.save(claseEstudiante)
            if(!saveClaseEstudiante){throw new Error ('No se pudo guardar Clase-Estudiante')}

            return saveClaseEstudiante;

        }catch (error) {this.errorNotFound(error)};
    };
}
