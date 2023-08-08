import { Controller,Get,Param } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Get()
    getStudents(): any {
        return this.estudianteService.getAllEstudiantes();
    }

    @Get(':id')
    public getEstudianteById(@Param('id') id): any {
        return this.estudianteService.getEstudianteById(parseInt(id))
    }
}
