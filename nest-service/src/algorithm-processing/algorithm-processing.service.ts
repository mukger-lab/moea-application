import { HttpService } from '@nestjs/axios';
import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {DisciplineResult} from "../document/interfaces";
import * as FormData from 'form-data';
import {CompetenceProfileData} from "../competence-profile/interfaces";
import {Competence} from "../competence/competence.entity";

@Injectable()
export class AlgorithmProcessingService {
    constructor(  
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getTextEmbeddings(texts: string[]): Promise<number[][]> {
        try {
            const baseUrl = this.configService.get<string>('SUBSID_API');
            const url = `${baseUrl}/api/bert/embed`;

            const payload = {
                texts: texts
            };

            const response = await this.httpService.axiosRef.post<number[][]>(url, payload);

            return response.data;
        } catch (error) {
            console.error(`APSGTE001: Failed to get embeddings from AI service, error: ${error}`);
            throw error;
        }
    }

    async processDocumentOcr(file: Express.Multer.File): Promise<DisciplineResult[]> {
        try {
            const baseUrl = this.configService.get<string>('SUBSID_API');
            const url = `${baseUrl}/api/ocr/process`;

            const formData = new FormData();

            formData.append('file', file.buffer, file.originalname);

            const response = await this.httpService.axiosRef.post(url, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            return response.data.data;

        } catch (error) {
            console.error(`APSPDO001: OCR Service Error:`, error.response?.data || error.message);
        }
    }

    async analyzeDisciplines(
        disciplines: DisciplineResult[],
        competences: Competence[],
        threshold: number
    ): Promise<CompetenceProfileData[]> {
        const payload = {
            disciplines: disciplines.map(d => ({
                title: d.discipline,
                score: d.score
            })),
            competences,
            threshold: threshold
        };

        try {
            const subsidiaryApiUrl = this.configService.get<string>('SUBSID_API');

            const response = await this.httpService.axiosRef.post(
                `${subsidiaryApiUrl}/api/analysis/match-competences`,
                payload
            );

            return response.data;
        } catch (error) {
            console.error(`APSAD001: AI Service Analysis Error, error: ${error}`);
            throw error;
        }
    }
}
