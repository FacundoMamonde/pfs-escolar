import { Controller,Get,Param } from '@nestjs/common';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {

    constructor(private readonly escuelaService: EscuelaService) {}

    @Get()
    getSchools(): any {
        return this.escuelaService.getAllEscuelas();
    }

    @Get(':id')
    public getSchoolById(@Param('id') id): any {
        return this.escuelaService.getEscuelaById(parseInt(id))
    }
}
