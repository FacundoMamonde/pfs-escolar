import { Entity, PrimaryGeneratedColumn, Column,OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Entity('escuela')

export class Escuela {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ nullable: false, length: 100 })
  private nombre: string;
  @Column({ nullable: false, length: 150 })
  private domicilio: string;

  constructor(nombre: string, domicilio:string) {
    this.nombre = nombre;
    this.domicilio = domicilio;
  }

  public getIdEscuela(): number {
    return this.id;
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

  @OneToOne(() => Ciudad)
  @JoinColumn({ name: 'id_ciudad' }) 
  ciudad: Ciudad;

  @OneToMany(() => Clase, clase => clase.escuela)
  @JoinColumn({name:'id_clase'})
  public clases: Clase[];

}