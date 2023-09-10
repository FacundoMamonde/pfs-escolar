import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CiudadDTO{
    @IsNotEmpty() @MinLength(2) @MaxLength(100)
    readonly nombre:string;
}