import { Clase } from 'src/clase/entities/clase.entity';
import { Entity, ManyToMany,OneToMany, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DomicilioEstudiante } from './domicilio_estudiante.entity';
import { ClaseEstudiante } from './clase_estudiante.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ nullable: false, length: 200 })
  private apellidoNombres: string;
  @Column({ nullable: false })
  private fechaNacimiento: Date;

  constructor(apellidoNombres: string, fechaNacimiento:Date) {
    this.apellidoNombres = apellidoNombres;
    this.fechaNacimiento = fechaNacimiento;
  } 

  public getIdEstudiante(): number {
    return this.id;
  }
  public getApellidoNombres(): string {
    return this.apellidoNombres;
  }
  public setApellidonombres(apellidoNombres: string): void {
    this.apellidoNombres= apellidoNombres;
  }
  public getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }
  public setFechaNacimiento(fechaNacimiento: Date): void {
    this.fechaNacimiento = fechaNacimiento;
  }

  @OneToMany(() => ClaseEstudiante, (claseEstudiante) => claseEstudiante.estudiante)
  claseEstudiantes: ClaseEstudiante[];

  @OneToMany(() => DomicilioEstudiante, domicilio => domicilio.estudiante)
  @JoinColumn({ name: 'domicilio_estudiante' })
  domicilios: DomicilioEstudiante[];
}