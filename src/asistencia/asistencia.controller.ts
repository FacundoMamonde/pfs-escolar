import { Body, Controller, Post } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDto } from './dto/asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {};

  @Post()
  public crearAsistencia(@Body() asistenciaDTO: AsistenciaDto): Promise<Asistencia>{
      return this.asistenciaService.newAsistencia(asistenciaDTO);
  };
}
