import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  public async getAll(): Promise<Ciudad[]> {
    this.ciudades = await this.ciudadRepository.find();
    return this.ciudades;
  };

  public async getCiudadById(id:number){
    const datos = await this.ciudadRepository.query('SELECT * FROM ciudad where id_ciudad = '+id+'');
    const ciudad: Ciudad = new Ciudad(datos[0].nombre);
    return ciudad;
  } 
}