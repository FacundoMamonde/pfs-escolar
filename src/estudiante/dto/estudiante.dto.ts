import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class EstudianteDTO{
    @IsNotEmpty() @IsString() @MinLength(2) @MaxLength(200)
    readonly nombre:string;
    @IsNotEmpty() @IsNumber()
    readonly idCiudad:number;
    @IsNotEmpty()  @IsString() @MinLength(2) @MaxLength(150)
    readonly domicilio:string;
    @IsNotEmpty() @IsDateString()
    readonly fechaNacimiento:Date;
}