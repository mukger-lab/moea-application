import {IsNotEmpty, IsString, Length} from "class-validator";

export class AddCompetenceDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    code: string;

    @IsNotEmpty()
    @IsString()
    @Length(32)
    description: string;
}