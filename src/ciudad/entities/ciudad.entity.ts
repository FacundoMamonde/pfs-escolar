import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn } from 'typeorm';
import { DomicilioProfesor } from 'src/profesor/entities/domicilio_profesor.entity';
import { DomicilioEstudiante } from 'src/estudiante/entities/domicilio_estudiante.entity';

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false, length: 100 })
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  };

  public getIdCiudad(): number {
    return this.id;
  };

  public getNombre(): string {
    return this.nombre;
  };

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  };

  @OneToMany(()=> DomicilioProfesor, domicilio  => domicilio.ciudad)
  @JoinColumn({name:'domicilio_profesor'})
  domicilioProfesor: DomicilioProfesor[];

  @OneToMany(()=> DomicilioEstudiante, domicilio  => domicilio.ciudad)
  @JoinColumn({name:'domicilio_estudiante'})
  domicilioEstudiante: DomicilioEstudiante[];

}