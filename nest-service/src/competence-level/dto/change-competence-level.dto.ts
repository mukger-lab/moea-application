import {IsEnum, IsOptional, IsString, Length} from "class-validator";
import {EcfProficiencyLevel} from "../enums";

export class ChangeCompetenceLevelDto {
    @IsOptional()
    @IsEnum(EcfProficiencyLevel, {
        message: 'Proficiency level must be a valid value (1, 2, 3, 4, 5)'
    })
    proficiencyLevel?: EcfProficiencyLevel;

    @IsOptional()
    @IsString()
    @Length(32)
    description?: string;
}