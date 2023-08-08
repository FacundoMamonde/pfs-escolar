import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'escolar',
      entities: ['./ciudad/entities/*.ts','./escuela/entities/*.ts','./profesor/entities/*.ts', './estudiante/entities/*.ts'],
      synchronize: false,
    }),
    CiudadModule,
    EscuelaModule,
    ProfesorModule,
    EstudianteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}