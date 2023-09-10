import { Entity, PrimaryGeneratedColumn, ManyToOne,Column, JoinColumn } from 'typeorm';
import { Profesor } from './profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Entity('domicilioProfesor')

export class DomicilioProfesor {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: false, length: 150 })
  private domicilio: string;

  constructor(domicilio: string) {
    this.domicilio= domicilio;
  };

  public getIdDomicilioProfesor(): number {
    return this.id;
  };

  public getDomicilio():string {
    return this.domicilio;
  };

  @ManyToOne(()=> Profesor, profesor => profesor.domicilios)
  @JoinColumn({name:'id_profesor'})
  profesor: Profesor;

  @ManyToOne(()=> Ciudad, ciudad => ciudad.domicilioProfesor)
  @JoinColumn({name:'id_ciudad'})
  ciudad: Ciudad;

}

