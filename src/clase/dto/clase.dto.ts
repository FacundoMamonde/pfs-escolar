import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class ClaseDto {
    @IsNotEmpty() @MinLength(3) @MaxLength(100)
    readonly nombre:string;
    @IsNotEmpty() @IsNumber()
    readonly idProfesor:number;
    @IsNotEmpty() @IsNumber()
    readonly idEscuela:number;
}
