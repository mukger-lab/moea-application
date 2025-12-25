import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AlgorithmProcessingModule } from 'src/algorithm-processing/algorithm-processing.module';
import { Document } from "./document.entity";
import {DocumentService} from "./document.service";
import {DocumentsRepository} from "./document.repository";
import {DocumentController} from "./document.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    AuthModule,
    AlgorithmProcessingModule,
  ],
  providers: [DocumentService, DocumentsRepository],
  controllers: [DocumentController],
  exports: [DocumentService]
})
export class DocumentModule {}
