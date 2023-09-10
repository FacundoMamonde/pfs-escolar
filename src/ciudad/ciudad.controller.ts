import { Controller,Get,Param,Post,Body,Put,Delete, Patch } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}

    @Get()
    getCities(): any {
        return this.ciudadService.getAll();
    };

    @Get(':id')
    public getcityById(@Param('id') id): Promise<Ciudad> {
        return this.ciudadService.getCiudadById(parseInt(id))
    };

    @Post('')
    public crearCiudad(@Body() ciudad: CiudadDTO): Promise<Ciudad>{
        return this.ciudadService.addCiudad(ciudad)
    };

    @Patch (':id')
    public actualizar(@Param('id') id:number, @Body() ciudad: CiudadDTO): Promise<Ciudad>{
        return this.ciudadService.updateCiudad(id,ciudad)
    };

    @Delete(':id')
    public eliminar(@Param('id') id:number): Promise<Boolean>{
        return this.ciudadService.deleteCiudad(id)
    };
}
