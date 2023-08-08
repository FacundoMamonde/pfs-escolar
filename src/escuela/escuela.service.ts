import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {
    private escuelas: Escuela[] = [];

  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) {}

  public async getAllEscuelas(): Promise<Escuela[]> {
    const datos = await this.escuelaRepository.query('SELECT * FROM escuela');

    datos.forEach((element) => {
      const escuela: Escuela = new Escuela(element['nombre'],element['domicilio'],element['id_ciudad']);
      this.escuelas.push(escuela);
    });
    console.log(this.escuelas);
    return this.escuelas;
  }

  public async getEscuelaById(id:number){
    const datos = await this.escuelaRepository.query('SELECT * FROM escuela where id_escuela = '+id+'');
    const escuela: Escuela = new Escuela(datos[0].nombre,datos[0].domicilio,datos[0].id_ciudad);
    return escuela;
  } 
}
