import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Escuela } from './entities/escuela.entity';
import { EscuelaDTO } from './dto/escuela.dto';

@Injectable()
export class EscuelaService {

  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) { }

  private errorNotFound(error) { // Funcion para no repetir tanto codigo
    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `${error}` },
      HttpStatus.NOT_FOUND)
  };

  public async getAllEscuelas(): Promise<Escuela[]> {
    try {
      let criterio: FindManyOptions = { relations: ['clases'] };
      let escuelas: Escuela[] = await this.escuelaRepository.find(criterio);
      if (!escuelas) { throw new Error('No se encontraron escuelas') };
      return escuelas
    } catch (error) { this.errorNotFound(error) }
  };

  public async getEscuelaById(id: number): Promise<Escuela> {
    try {
      const filter: FindOneOptions = { where: { id: id } };
      let escuela: Escuela = await this.escuelaRepository.findOne(filter);
      if (!escuela) { throw new Error("No se encontro escuela con id: " + id); };
      return escuela;
    } catch (error) { this.errorNotFound(error) };
  };

  public async addEscuela(escuelaDTO: EscuelaDTO): Promise<Escuela> {
    try {
      let escuela: Escuela = await this.escuelaRepository.save(new Escuela(escuelaDTO.nombre, escuelaDTO.domicilio));
      if (!escuela){throw new Error("Error al agregar escuela")};
        return escuela 
    } catch (error) { this.errorNotFound(error) };
  };
}
