import { Controller,Get,Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}

    @Get()
    getCitys(): any {
        return this.ciudadService.getAll();
    }

    @Get(':id')
    public getcityById(@Param('id') id): any {
        return this.ciudadService.getCiudadById(parseInt(id))
    }
}
