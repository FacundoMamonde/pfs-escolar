import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class ProfesorDTO {
    @IsNotEmpty() @IsString() @MinLength(2) @MaxLength(100)
    readonly apellidoNombres: string;
    @IsNotEmpty() @IsNumber()
    readonly idCiudad: number;
    @IsNotEmpty() @IsString() @MinLength(2) @MaxLength(100)
    readonly domicilio: string;
}