import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddCompetenceLevelDto } from './dto/add-competence-level.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/meta-data-roles.decorator';
import { ChangeCompetenceLevelDto } from './dto/change-competence-level.dto';
import {CompetenceLevelService} from "./competence-level.service";
import {CompetenceLevel} from "./competence-level.entity";

@UseGuards(JwtAuthGuard) 
@Controller("competence-level")
export class CompetenceLevelController {
    constructor(private readonly competenceLevelService: CompetenceLevelService) {}

    @Get('/:competenceLevelId')
    @HttpCode(HttpStatus.OK)
    getCompetenceLevelById(
        @Param('competenceLevelId', new ParseUUIDPipe()) competenceLevelId: string
    ): Promise<CompetenceLevel> {
        return this.competenceLevelService.getCompetenceLevelById(competenceLevelId);
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RolesGuard)
    @Roles('admin')
    addCompetenceLevel(
        @Body() addCompetenceLevelDto: AddCompetenceLevelDto
    ): Promise<CompetenceLevel> {
        return this.competenceLevelService.addCompetenceLevel(addCompetenceLevelDto);
    }

    @Patch('/:competenceLevelId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles('admin')
    changeCompetenceLevelById(
        @Body() changeCompetenceLevelDto: ChangeCompetenceLevelDto,
        @Param('competenceLevelId', new ParseUUIDPipe()) competenceLevelId: string
    ): Promise<CompetenceLevel> {
        return this.competenceLevelService.changeCompetenceLevelById(competenceLevelId, changeCompetenceLevelDto);
    }

    @Delete('/:competenceLevelId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(RolesGuard)
    @Roles('admin')
    deleteCompetenceLevelById(
        @Param('competenceLevelId', new ParseUUIDPipe()) competenceLevelId: string
    ): Promise<void> {
        return this.competenceLevelService.deleteCompetenceLevelById(competenceLevelId)
    }
}
