import { Clase } from 'src/clase/entities/clase.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany,Column } from 'typeorm';
import { DomicilioProfesor } from './domicilio_profesor.entity';

@Entity('profesor')
export class Profesor {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false, length: 200 })
  private apellidoNombres: string;

  constructor(apellidoNombres: string) {
    this.apellidoNombres = apellidoNombres;
  };

  public getIdProfesor(): number {
    return this.id;
  };

  public getApellidoNombres(): string {
    return this.apellidoNombres;
  };

  public setApellidonombres(apellidoNombres: string): void {
    this.apellidoNombres= apellidoNombres;
  };

  @OneToMany(()=> Clase, clase => clase.profesor)
  clases :Clase;

  @OneToMany(()=> DomicilioProfesor, domicilio  => domicilio.profesor)
  domicilios:DomicilioProfesor[];
}