import { IsNotEmpty, IsNumber } from 'class-validator';

export class InscripcionDTO{
    @IsNotEmpty() @IsNumber()
    readonly idEstudiante:number;
    @IsNotEmpty() @IsNumber()
    readonly idClase:number;
}