import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('escuelas')
export class Escuela {
  @PrimaryGeneratedColumn()
  private idEscuela: number;
  @Column()
  private nombre: string;
  private domicilio:string;
  private idCiudad:number;

  constructor(nombre: string,domicilio:string,idCiudad:number) {
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.idCiudad = idCiudad;
  }

  public getIdEscuela(): number {
    return this.idEscuela;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  public getDomicilio(): string {
    return this.domicilio;
  }
  public setDomicilio(domicilio: string): void {
    this.domicilio = domicilio;
  }
  public getIdCiudad(): number {
    return this.idCiudad;
  }
  public setIdCiudad(idCiudad: number): void {
    this.idCiudad= idCiudad;
  }
}