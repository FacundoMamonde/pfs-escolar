import { Module } from '@nestjs/common';
import { EscuelaController } from './escuela.controller';
import { EscuelaService } from './escuela.service';
import { Escuela } from './entities/escuela.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clase/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Clase])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}