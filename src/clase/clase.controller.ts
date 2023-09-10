import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { UpdateClaseDto } from './dto/updateClase.dto';
import { Clase } from './entities/clase.entity';
import { ClaseDto } from './dto/clase.dto';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  create(@Body() createClaseDto: ClaseDto) {
    return this.claseService.create(createClaseDto);
  };

  @Get()
  findAll() {
    return this.claseService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claseService.findOne(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaseDto: UpdateClaseDto) {
    return this.claseService.update(+id, updateClaseDto);
  };

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Clase> {
    return await this.claseService.remove(+id);
  };
}
