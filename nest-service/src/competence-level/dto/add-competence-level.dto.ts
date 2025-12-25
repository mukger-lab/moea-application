import {IsNotEmpty, IsString, IsEnum, IsUUID, Length} from "class-validator";
import { EcfProficiencyLevel } from '../enums';

export class AddCompetenceLevelDto {
    @IsNotEmpty()
    @IsUUID('all', { message: 'Competence ID must be a valid UUID' })
    competenceId: string;

    @IsNotEmpty()
    @IsEnum(EcfProficiencyLevel, {
        message: 'Proficiency level must be a valid value (1, 2, 3, 4, 5)'
    })
    proficiencyLevel: EcfProficiencyLevel;

    @IsNotEmpty()
    @IsString()
    @Length(32)
    description: string;
}