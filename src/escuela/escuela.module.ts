import { Module } from '@nestjs/common';
import { EscuelaController } from './escuela.controller';
import { EscuelaService } from './escuela.service';
import { Escuela } from './entities/escuela.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}