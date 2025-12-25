import {ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCompetenceLevelDto } from './dto/add-competence-level.dto';
import { ChangeCompetenceLevelDto } from './dto/change-competence-level.dto';
import { AlgorithmProcessingService } from 'src/algorithm-processing/algorithm-processing.service';
import {CompetencesLevelRepository} from "./competence-level.repository";
import {CompetenceLevel} from "./competence-level.entity";
import {CompetenceService} from "../competence/competence.service";

@Injectable()
export class CompetenceLevelService {
    constructor(  
        @InjectRepository(CompetencesLevelRepository)
        private readonly competencesLevelRepository: CompetencesLevelRepository,
        @Inject(CompetenceService)
        private readonly competenceService: CompetenceService,
    ) {}

    async getCompetenceLevelById(competenceLevelId: string): Promise<CompetenceLevel> {
        const competenceLevel = await this.competencesLevelRepository.findOneBy({id: competenceLevelId})

        if (!competenceLevel) {
            throw new NotFoundException('There is no competence level with given id')
        }

        return competenceLevel;
    }

    async addCompetenceLevel(addCompetenceLevelDto: AddCompetenceLevelDto): Promise<CompetenceLevel> {
        const {competenceId} = addCompetenceLevelDto;

        await this.competenceService.getCompetenceById(competenceId);

        try {
            return await this.competencesLevelRepository.save(addCompetenceLevelDto);
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }

    async changeCompetenceLevelById(
        competenceLevelId: string,
        changeCompetenceLevelDto: ChangeCompetenceLevelDto
    ): Promise<CompetenceLevel> {
        const competenceLevel = await this.getCompetenceLevelById(competenceLevelId);

        Object.assign(competenceLevel, changeCompetenceLevelDto);

        try {
            return await this.competencesLevelRepository.save(competenceLevel);
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }

    async deleteCompetenceLevelById(competenceLevelId: string): Promise<void> {
        const result = await this.competencesLevelRepository.delete({id: competenceLevelId})
        if (result.affected === 0) {
            throw new NotFoundException("There is no competence level with this id")
        }
    }
}
