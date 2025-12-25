import {
    Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param,
    ParseFilePipe, ParseUUIDPipe, Patch, Post, UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {CompetenceProfileService} from "./competence-profile.service";
import {CompetenceProfile} from "./competence-profile.entity";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {User} from "../auth/entities/user/user.entity";
import {GenerateCompetenceProfileDto} from "./dto/generate-competence-profile.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@UseGuards(JwtAuthGuard) 
@Controller("competence-profile")
export class CompetenceProfileController {
    constructor(private readonly competenceProfileService: CompetenceProfileService) {}

    @Get('/lastGenerated')
    @HttpCode(HttpStatus.OK)
    getLastGeneratedCompetenceProfile(
        @GetUser() user: User,
    ): Promise<CompetenceProfile> {
        return this.competenceProfileService.getLastGeneratedCompetenceProfile(user.id);
    }

    @Get('/:competenceProfileId')
    @HttpCode(HttpStatus.OK)
    getCompetenceProfileById(
        @GetUser() user: User,
        @Param('competenceProfileId', new ParseUUIDPipe()) competenceProfileId: string
    ): Promise<CompetenceProfile> {
        return this.competenceProfileService.getCompetenceProfileById(competenceProfileId, user.id);
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    getAllGeneratedCompetenceProfiles(
        @GetUser() user: User,
    ): Promise<CompetenceProfile[]> {
        return this.competenceProfileService.getAllGeneratedCompetenceProfiles(user.id);
    }

    @Post('/generate')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    generateCompetenceProfile(
        @GetUser() user: User,
        @Body() generateCompetenceProfileDto: GenerateCompetenceProfileDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
                    new FileTypeValidator({ fileType: 'application/pdf' }),
                ],
            }),
        ) file: Express.Multer.File
    ): Promise<CompetenceProfile> {
        return this.competenceProfileService.generateCompetenceProfile(
            file,
            user.id,
            generateCompetenceProfileDto,
        );
    }
}
