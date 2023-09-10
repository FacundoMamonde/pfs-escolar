import { Body, Controller,Get,Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDTO } from './dto/estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InscripcionDTO } from './dto/inscripcion.dto';
import { ClaseEstudiante } from './entities/clase_estudiante.entity';

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

    @Post()
    public crearEstudiante(@Body() estudianteDTO: EstudianteDTO): Promise<Estudiante>{
        return this.estudianteService.newEstudiante(estudianteDTO)
    }

    @Post('inscripcion')
    public inscripcion(@Body() inscripcionDTO: InscripcionDTO): Promise<ClaseEstudiante>{
        return this.estudianteService.newInscripcion(inscripcionDTO)
    }
}
