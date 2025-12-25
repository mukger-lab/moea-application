import { IsOptional, IsString, Length } from "class-validator";

class GenerateCompetenceProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 255)
    name?: string;
}

export {
    GenerateCompetenceProfileDto,
}
