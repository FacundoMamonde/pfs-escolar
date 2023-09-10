import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class EscuelaDTO{
    @IsNotEmpty() @IsString() @MinLength(2) @MaxLength(100)
    readonly nombre:string;
    @IsNotEmpty() @IsString() @MinLength(2) @MaxLength(150)
    readonly domicilio:string;
    @IsNotEmpty() @IsNumber()
    readonly id_ciudad:number;
    
}