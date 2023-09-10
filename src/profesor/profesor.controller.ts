import { Body, Controller,Get,Param,Post } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './entities/profesor.entity';
import { ProfesorDTO } from './dto/profesor.dto';

@Controller('profesor')
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService) {}

    @Get()
    getProfesors(): any {
        return this.profesorService.getAllProfesores();
    };

    @Get(':id')
    public getProfesorById(@Param('id') id): any {
        return this.profesorService.getProfesorById(parseInt(id))
    };

    @Post()
    public crearProfesor(@Body() profesorDTO: ProfesorDTO): Promise<Profesor>{
        return this.profesorService.newProfesor(profesorDTO)
    };
}
