import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn()
  private id_ciudad: number;

  @Column()
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  public getIdCiudad(): number {
    return this.id_ciudad;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
}