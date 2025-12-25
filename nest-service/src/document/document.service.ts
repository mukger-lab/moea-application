import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from "./document.entity";
import {DocumentsRepository} from "./document.repository";
import {AlgorithmProcessingService} from "../algorithm-processing/algorithm-processing.service";
import * as _ from "lodash";

@Injectable()
export class DocumentService {
    constructor(  
        @InjectRepository(DocumentsRepository)
        private readonly documentsRepository: DocumentsRepository,
        @Inject(AlgorithmProcessingService)
        private readonly algorithmProcessingService: AlgorithmProcessingService,
    ) {}

    async getDocumentById(
        documentId: string,
        userId: string
    ): Promise<Document> {
        const document = await this.documentsRepository.findOneBy({
            id: documentId,
            userId,
        })

        if (!document) {
            throw new NotFoundException('There is no document with given id');
        }

        return document;
    }

    async getAllUserDocuments(userId: string): Promise<Document[]> {
        return await this.documentsRepository.find({
            where: {
                userId: userId
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async processAndSaveDocument(
        file: Express.Multer.File,
        userId: string,
        filename: string
    ): Promise<Document> {
        const ocrResults = await this.algorithmProcessingService.processDocumentOcr(file);

        if (_.isEmpty(ocrResults)) {
            throw new BadRequestException(
                'The document format (or size) is invalid or contains no recognizable academic records. Please upload a clear PDF of a diploma supplement.'
            );
        }

        try {
            return await this.documentsRepository.save({
                userId: userId,
                filename,
                extractedData: ocrResults,
            });
        } catch (error) {
            throw error;
        }
    }
}
