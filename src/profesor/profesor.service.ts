import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { ProfesorDTO } from './dto/profesor.dto';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { DomicilioProfesor } from './entities/domicilio_profesor.entity';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(DomicilioProfesor)
    private readonly domicilioProfesorRepository: Repository<DomicilioProfesor>,
  ) { }

  private errorNotFound(error) { // Funcion para no repetir tanto codigo
    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `${error}` },
      HttpStatus.NOT_FOUND)
  };

  public async newProfesor(profesorDTO: ProfesorDTO): Promise<Profesor> {
    try {
      let profesor = new Profesor(profesorDTO.apellidoNombres);

      let criterioCiudad: FindOneOptions = { where: { id: profesorDTO.idCiudad } }
      let ciudad = await this.ciudadRepository.findOne(criterioCiudad);

      if (!ciudad) { throw new Error('No se encontro ciudad')};

      let domicilio = new DomicilioProfesor(profesorDTO.domicilio);
      domicilio.ciudad = ciudad;
      let saveDomicilio = await this.domicilioProfesorRepository.save(domicilio)

      if (!saveDomicilio) { throw new Error('No se pudo guardar domicilio de profesor')};

      profesor.domicilios = [saveDomicilio]
      let saveProfesor = await this.profesorRepository.save(profesor);

      if (!saveProfesor) {throw new Error('No se pudo guardar el profesor')};

      return saveProfesor;
    } catch (error) {this.errorNotFound(error)};
  }

  public async getAllProfesores(): Promise<Profesor[]> {
    try {
      let criterio: FindManyOptions = { relations: ['domicilios', 'domicilios.ciudad'] };
      const datos = await this.profesorRepository.find(criterio);
      if (!datos) {throw new Error('No se pudo realizar la busqueda')};

      return datos;
    } catch (error) {this.errorNotFound(error)};
  };

  public async getProfesorById(id: number) {

    try {
      const criterio: FindOneOptions = { where: { id: id }, relations: ['domicilios', 'domicilios.ciudad'] };
      let profesor = this.profesorRepository.findOne(criterio);
      if (!profesor) {
        throw new Error('No se encontro profesor con id: ' + id);
      }
      return profesor

    } catch (error) {this.errorNotFound(error)};
  };
}