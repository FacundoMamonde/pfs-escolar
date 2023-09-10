import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from './estudiante.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Entity()
export class ClaseEstudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Clase, (clase) => clase.claseEstudiantes)
  @JoinColumn({ name: 'claseId' })
  clase: Clase;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.claseEstudiantes)
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;
  
  @OneToMany(() => Asistencia, (asistencia) => asistencia.claseEstudiante)
  asistencias: Asistencia[];
}
