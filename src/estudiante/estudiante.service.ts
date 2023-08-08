import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {
    private estudiantes: Estudiante[] = [];

    constructor(
        @InjectRepository(Estudiante)
        private readonly estudianteRepository: Repository<Estudiante>,
    ) {}

    public async getAllEstudiantes(): Promise<Estudiante[]> {
        const datos = await this.estudianteRepository.query('SELECT * FROM estudiante');

        datos.forEach((element) => {
            const estudiante: Estudiante = new Estudiante(element['apellidoNombres']);
            this.estudiantes.push(estudiante);
        });
        console.log(this.estudiantes);
        return this.estudiantes;
    };

    public async getEstudianteById(id:number){
        const datos = await this.estudianteRepository.query('SELECT * FROM estudiante where id_estudiante = '+id+'');
        const estudiante: Estudiante = new Estudiante(datos[0].apellidoNombres);
        return estudiante;
    };
}
