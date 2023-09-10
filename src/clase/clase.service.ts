import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { UpdateClaseDto } from './dto/updateClase.dto';

@Injectable()
export class ClaseService {

  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) { }

  private errorNotFound(error) { // Funcion para no repetir tanto codigo
    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `${error}` },
      HttpStatus.NOT_FOUND)
  };

  async create(ClaseDto: any) {
    try {
      let criterioProfesor: FindOneOptions = { where: { id: ClaseDto.idProfesor } };
      let profesor: Profesor = await this.profesorRepository.findOne(criterioProfesor);

      if (!profesor) { throw new Error('No existe profesor') };

      let criterioEscuela: FindOneOptions = { where: { id: ClaseDto.idEscuela } };
      let escuela: Escuela = await this.escuelaRepository.findOne(criterioEscuela);

      if (!escuela) { throw new Error('No existe escuela') };

      let nuevaClase: Clase = new Clase(ClaseDto.nombre);
      nuevaClase.profesor = profesor;
      nuevaClase.escuela = escuela;
      let clase: Clase = await this.claseRepository.save(nuevaClase);

      if (!clase) { throw new Error(`No se pudo crear la nueva clase`) };

      return clase;
    }
    catch (error) { this.errorNotFound(error) }
  };

  async findAll(): Promise<Clase[]> {
    try {
      let criterio: FindManyOptions = { relations: ['escuela', 'profesor'] };
      let clases: Clase[] = await this.claseRepository.find(criterio);
      if (!clases) { throw new Error('No se encontraron clases') };
      return clases
    } catch (error) { this.errorNotFound(error) };
  };

  async findOne(id: number): Promise<Clase> {
    try {
      const criterio: FindOneOptions = { where: { id: id },relations: ['profesor']};
      let clase: Clase = await this.claseRepository.findOne(criterio);
      if (!clase) { throw new Error('No se encontro clase') };
      return clase;
    } catch (error) { this.errorNotFound(error) }
  };

  async update(id: number, updateClaseDto: UpdateClaseDto): Promise<Clase> {
    try {
      const criterioClase: FindOneOptions = { where: { id: id } };
      let clase: Clase = await this.claseRepository.findOne(criterioClase);
      if (!clase) { throw new Error('No se encontro clase')};

      if (!updateClaseDto.idProfesor && !updateClaseDto.nombre) { throw new Error('No se pasaron datos para actualizar la clase')}

      if (updateClaseDto.idProfesor) {
        const criterioProfesor: FindOneOptions = { where: { id: updateClaseDto.idProfesor } };
        let profesor: Profesor = await this.profesorRepository.findOne(criterioProfesor);
        if (!profesor) { throw new Error('No se encuentra profesor para la Clase')};
        clase.setProfesor(profesor);
      };

      if (updateClaseDto.nombre) { 
        clase.setNombre(updateClaseDto.nombre)
      };

      let update = this.claseRepository.save(clase);

      if (!update) { throw new Error('No se pudo actualizar la clase')};

      return update;

    } catch (error){this.errorNotFound(error)}
  };

  async remove(id: number): Promise<Clase> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const clase: Clase = await this.claseRepository.findOne(criterio);
      if (!clase) {throw new Error("No se encontró la clase")};

      let eliminacion = await this.claseRepository.remove(clase);
      if (!eliminacion) {throw new Error("No se pudo eliminar clase")};

      return eliminacion;
    } catch (error){this.errorNotFound(error)};
  };
}
