import { Controller,Get,Param, Post, Body} from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { Escuela } from './entities/escuela.entity';
import { EscuelaDTO } from './dto/escuela.dto';

@Controller('escuela')
export class EscuelaController {

    constructor(private readonly escuelaService: EscuelaService) {}

    @Get()
    getSchools(): any {
        return this.escuelaService.getAllEscuelas();
    }

    @Get(':id')
    public getSchoolById(@Param('id') id): Promise<Escuela> {
        return this.escuelaService.getEscuelaById(parseInt(id))
    }

    @Post()
    public crearEscuela(@Body() escuela: EscuelaDTO): Promise<Escuela>{
        return this.escuelaService.addEscuela(escuela)
    };
}
