import { Entity, PrimaryGeneratedColumn, ManyToOne,Column, JoinColumn } from 'typeorm';
import { ClaseEstudiante } from 'src/estudiante/entities/clase_estudiante.entity';

@Entity('asistencia')

export class Asistencia {

  @PrimaryGeneratedColumn()
  private id: number;
  
  @Column({ nullable: false })
  private fecha: Date;

  @Column({ default: false })
  presencia: boolean;

  constructor(fecha:Date, presencia:boolean) {
    this.fecha = fecha;
    this.presencia = presencia;
  }

  public getId(): number {
    return this.id;
  }

  public getFecha():Date{
    return this.fecha;
  }

  @ManyToOne(() => ClaseEstudiante, (claseEstudiante) => claseEstudiante.asistencias)
  @JoinColumn({ name: 'claseEstudianteId' })
  claseEstudiante: ClaseEstudiante;
}
