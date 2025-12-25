import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Competence } from './competence.entity';
import { CompetencesRepository } from './competence.repository';
import { AlgorithmProcessingModule } from 'src/algorithm-processing/algorithm-processing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competence]),
    AuthModule,
    AlgorithmProcessingModule,
  ],
  providers: [CompetenceService, CompetencesRepository],
  controllers: [CompetenceController],
  exports: [CompetenceService]
})
export class CompetenceModule {}
