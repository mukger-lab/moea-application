import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class ChangeSystemConfigDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    value?: string;

    @IsOptional()
    @IsString()
    description?: string;
}