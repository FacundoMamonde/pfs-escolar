import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  private idProfesor: number;
  @Column()
  private apellidoNombres: string;

  constructor(apellidoNombres: string) {
    this.apellidoNombres = apellidoNombres;
  }

  public getIdProfesor(): number {
    return this.idProfesor;
  }
  public getApellidoNombres(): string {
    return this.apellidoNombres;
  }
  public setApellidonombres(apellidoNombres: string): void {
    this.apellidoNombres= apellidoNombres;
  }
}