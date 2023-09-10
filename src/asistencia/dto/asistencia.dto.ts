import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class AsistenciaDto {
    @IsNotEmpty() @IsDateString()
    readonly fecha:Date;

    @IsNotEmpty() @IsBoolean()
    readonly asistencia:boolean;

    @IsNotEmpty() @IsNumber()
    readonly idClaseEstudiante:number;
}
