import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateClaseDto {
    @IsOptional() @IsNumber()
    readonly idProfesor?:number;
    @IsString() @MinLength(3) @MaxLength(100)
    readonly nombre?:string;
}
