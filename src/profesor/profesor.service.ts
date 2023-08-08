import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {
    private profesores: Profesor[] = [];

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  public async getAllProfesores(): Promise<Profesor[]> {
    const datos = await this.profesorRepository.query('SELECT * FROM profesor');

    datos.forEach((element) => {
      const profesor: Profesor = new Profesor(element['apellidoNombres']);
      this.profesores.push(profesor);
    });
    console.log(this.profesores);
    return this.profesores;
  };

  public async getProfesorById(id:number){

    const datos = await this.profesorRepository.query('SELECT * FROM profesor where id_profesor = '+id+'');
    const profesor: Profesor = new Profesor(datos[0].apellidoNombres);
    return profesor;

  } 
}