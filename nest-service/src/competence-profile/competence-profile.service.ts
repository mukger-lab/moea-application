import {Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {CompetenceProfileRepository} from "./competence-profile.repository";
import {CompetenceProfile} from "./competence-profile.entity";
import {DocumentService} from "../document/document.service";
import * as _ from "lodash";
import {AlgorithmProcessingService} from "../algorithm-processing/algorithm-processing.service";
import {similarityThresholdDefaultValue, similarityThresholdKey} from "../system-config/constants";
import {SystemConfigService} from "../system-config/system-config.service";
import {GenerateCompetenceProfileDto} from "./dto/generate-competence-profile.dto";
import {CompetenceService} from "../competence/competence.service";
import {Document} from "../document/document.entity";

@Injectable()
export class CompetenceProfileService {
    constructor(  
        @InjectRepository(CompetenceProfileRepository)
        private readonly competenceProfileRepository: CompetenceProfileRepository,
        @Inject(DocumentService)
        private readonly documentService: DocumentService,
        @Inject(AlgorithmProcessingService)
        private readonly algorithmProcessingService: AlgorithmProcessingService,
        @Inject(SystemConfigService)
        private readonly systemConfigService: SystemConfigService,
        @Inject(CompetenceService)
        private readonly competenceService: CompetenceService
    ) {}

    async getCompetenceProfileById(competenceProfileId: string, userId: string): Promise<CompetenceProfile> {
        const competenceProfile = await this.competenceProfileRepository
            .createQueryBuilder('profile')
            .leftJoinAndSelect('profile.document', 'document')
            .where('profile.id = :id', { id: competenceProfileId })
            .andWhere('document.userId = :userId', { userId })
            .getOne();

        if (!competenceProfile) {
            throw new NotFoundException('There is no competence profile with given id');
        }

        return competenceProfile;
    }

    async getLastGeneratedCompetenceProfile(userId: string): Promise<CompetenceProfile> {
        const lastProfile = await this.competenceProfileRepository
            .createQueryBuilder('profile')
            .leftJoinAndSelect('profile.document', 'document')
            .where('document.userId = :userId', { userId })
            .orderBy('profile.createdAt', 'DESC')
            .getOne();

        if (!lastProfile) {
            throw new NotFoundException('No competence profiles found for this user');
        }

        return lastProfile;
    }

    async getAllGeneratedCompetenceProfiles(userId: string): Promise<CompetenceProfile[]> {
        return await this.competenceProfileRepository
            .createQueryBuilder('profile')
            .leftJoin('profile.document', 'document')
            .select([
                'profile.id',
                'profile.createdAt',
                'profile.algorithmMetadata',
                'document.id',
                'document.filename',
                'document.createdAt'
            ])
            .where('document.userId = :userId', { userId })
            .orderBy('profile.createdAt', 'DESC')
            .getMany();
    }

    async generateCompetenceProfile(
        file: Express.Multer.File,
        userId: string,
        generateCompetenceProfileDto: GenerateCompetenceProfileDto
    ): Promise<CompetenceProfile> {
        try {
            console.log(`CPSGCP001: Start to generate competence profile for user with id ${userId}`);

            const documentName = generateCompetenceProfileDto.name || file.originalname;

            const thresholdConfig = await this.systemConfigService.getSystemConfigByKey(similarityThresholdKey);
            const threshold = parseFloat(thresholdConfig?.value) || similarityThresholdDefaultValue;

            const savedDocument = await this.documentService.processAndSaveDocument(
                file,
                userId,
                documentName
            );

            if (_.isEmpty(savedDocument.extractedData)) {
                throw new InternalServerErrorException('Failed to extract data from document');
            }

            console.log(`CPSGCP002: Data was successfully extracted for document with id ${savedDocument.id} (userId: ${userId})`);

            const actualCompetences = await this.competenceService.getAllCompetencesWithLevels();

            const profileData = await this.algorithmProcessingService.analyzeDisciplines(
                savedDocument.extractedData,
                actualCompetences,
                threshold
            );

            console.log(`CPSGCP003: Profile data was successfully generated for document with id ${savedDocument.id} (userId: ${userId})`);

            return await this.competenceProfileRepository.save({
                documentId: savedDocument.id,
                algorithmMetadata: {
                    [similarityThresholdKey]: threshold,
                },
                profileData: profileData
            });
        } catch (error) {
            console.error(`CPSGCP004: Error generating profile for user ${userId}:`, error.message);

            throw error;
        }
    }
}
