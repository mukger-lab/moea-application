import {IsOptional, IsString, Length} from "class-validator";

export class ChangeCompetenceDto {
    @IsOptional()
    @IsString()
    @Length(6, 255)
    name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    code?: string;

    @IsOptional()
    @IsString()
    @Length(32)
    description?: string;
}