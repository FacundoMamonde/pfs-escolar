import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  private idEstudiante: number;
  @Column()
  private apellidoNombres: string;

  constructor(apellidoNombres: string) {
    this.apellidoNombres = apellidoNombres;
  }

  public getIdEstudiante(): number {
    return this.idEstudiante;
  }
  public getApellidoNombres(): string {
    return this.apellidoNombres;
  }
  public setApellidonombres(apellidoNombres: string): void {
    this.apellidoNombres= apellidoNombres;
  }
}