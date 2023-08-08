import { Controller,Get,Param } from '@nestjs/common';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {

    constructor(private readonly profesorService: ProfesorService) {}

    @Get()
    getProfesors(): any {
        return this.profesorService.getAllProfesores();
    }

    @Get(':id')
    public getProfesorById(@Param('id') id): any {
        return this.profesorService.getProfesorById(parseInt(id))
    }
}
