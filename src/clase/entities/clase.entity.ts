import { Entity, PrimaryGeneratedColumn, Column, JoinColumn,ManyToOne, OneToMany} from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { ClaseEstudiante } from 'src/estudiante/entities/clase_estudiante.entity';

@Entity('clase')

export class Clase{
    @PrimaryGeneratedColumn()
    private id: number;
  
    @Column({ nullable: false, length: 100 })
    private nombre: string;

    constructor(nombre: string) {
      this.nombre = nombre;
    }
  
    public getIdClase(): number {
      return this.id;
    }
    public getNombre(): string {
      return this.nombre;
    }
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }

    public setProfesor(newProfesor:Profesor) {
      this.profesor = newProfesor
    }

    @ManyToOne(()=>Profesor,profesor => profesor.clases)
    @JoinColumn({name:'id_profesor'})
    profesor: Profesor;

    @ManyToOne(()=>Escuela,escuela => escuela.clases)
    @JoinColumn({name:'id_escuela'})
    escuela: Escuela;

    @OneToMany(() => ClaseEstudiante, (claseEstudiante) => claseEstudiante.clase)
    claseEstudiantes: ClaseEstudiante[];
}