import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) { }

  private errorNotFound(error) { // Funcion para no repetir tanto codigo
    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `${error}` },
      HttpStatus.NOT_FOUND)
  };

  public async getAll(): Promise<Ciudad[]> {
    try {
      let ciudades = await this.ciudadRepository.find();
      if (!ciudades) { throw new Error('No se econtraron ciudades') };
      return ciudades;
    } catch (error) { this.errorNotFound(error) };
  };

  public async getCiudadById(id: number): Promise<Ciudad> {
    try {
      const filter: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(filter);
      if (!ciudad) { throw new Error("No se encontro ciudad con id: " + id) };
      return ciudad;
    } catch (error) { this.errorNotFound(error) };
  };

  public async addCiudad(ciudadDTO: CiudadDTO): Promise<Ciudad> {
    try {
      let ciudad: Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
      if (!ciudad) { throw new Error(`No se pudo crear la nueva ciudad`) };

      return ciudad;
    } catch (error) { this.errorNotFound(error) };
  };

  public async updateCiudad(id: number, ciudadDTO: CiudadDTO): Promise<Ciudad> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      ciudad.setNombre(ciudadDTO.nombre);
      ciudad = await this.ciudadRepository.save(ciudad);
      if (!ciudad) { throw new Error(`No se pudo actualizar ciudad id: ` + id) };

      return ciudad;
    }
    catch (error) { this.errorNotFound(error) };
  };

  public async deleteCiudad(id: number): Promise<Boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad) { throw new Error(`No se pudo encontrar id: ` + id)};

      let deleteCiudad = await this.ciudadRepository.delete(id);
      if (!deleteCiudad){ throw new Error(`No se pudo borrar la ciudad ${ciudad.getNombre}, de id: ${ciudad.getIdCiudad}`)};

      return true;
    }
    catch (error) { this.errorNotFound(error) };
  };
}