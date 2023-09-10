import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne,Column } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Entity('domicilioEstudiante')

export class DomicilioEstudiante {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false, length: 150 })
  private domicilio: string;

  constructor(domicilio: string) {
    this.domicilio = domicilio;
  }

  public getIdDomicilioEstudiante(): number {
    return this.id;
  }

  public getDomicilio():string {
    return this.domicilio
  }

  @ManyToOne(() => Estudiante, estudiante => estudiante.domicilios)
  @JoinColumn({name:'id_estudiante'})
  estudiante: Estudiante;

  @ManyToOne(()=> Ciudad, ciudad => ciudad.domicilioEstudiante)
  @JoinColumn({name:'id_ciudad'})
  ciudad: Ciudad;

}