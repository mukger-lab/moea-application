import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetencesRepository } from './competence.repository';
import { Competence } from './competence.entity';
import { AddCompetenceDto } from './dto/add-competence.dto';
import { ChangeCompetenceDto } from './dto/change-competence.dto';
import { AlgorithmProcessingService } from 'src/algorithm-processing/algorithm-processing.service';

@Injectable()
export class CompetenceService {
    constructor(  
        @InjectRepository(CompetencesRepository)
        private readonly competencesRepository: CompetencesRepository,
    ) {}

    async getAllCompetences(): Promise<Competence[]> {
        return await this.competencesRepository.find();
    }

    async getAllCompetencesWithLevels(): Promise<Competence[]> {
        return await this.competencesRepository.find({
            relations: {
                levels: true
            },
            select: {
                id: true,
                code: true,
                name: true,
                description: true,
                levels: {
                    id: true,
                    proficiencyLevel: true,
                    description: true,
                },
            },
        });
    }

    async getCompetenceById(competenceId: string): Promise<Competence> {
        const competence = await this.competencesRepository.findOne({
            where: { id: competenceId},
            relations: { levels: true },
            order: {
                levels: {
                    proficiencyLevel: 'ASC',
                }
            }
        });

        if (!competence) {
            throw new NotFoundException('There is no competence with given id')
        }

        return competence
    }

    async addCompetence(addCompetenceDto: AddCompetenceDto): Promise<Competence> {
        try {
            return await this.competencesRepository.save(addCompetenceDto);
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }

    async changeCompetenceById(
        competenceId: string,
        changeCompetenceDto: ChangeCompetenceDto
    ): Promise<Competence> {
        const competence = await this.getCompetenceById(competenceId);

        Object.assign(competence, changeCompetenceDto);

        try {
            return await this.competencesRepository.save(competence);
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }

    async deleteCompetenceById(competenceId: string): Promise<void> {
        const result = await this.competencesRepository.delete({id: competenceId})
        if (result.affected === 0) {
            throw new NotFoundException("There is no competence with this id")
        }
    }
}
