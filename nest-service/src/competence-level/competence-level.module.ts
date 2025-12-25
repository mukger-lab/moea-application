import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AlgorithmProcessingModule } from 'src/algorithm-processing/algorithm-processing.module';
import {CompetenceLevel} from "./competence-level.entity";
import {CompetenceLevelService} from "./competence-level.service";
import {CompetencesLevelRepository} from "./competence-level.repository";
import {CompetenceLevelController} from "./competence-level.controller";
import {CompetenceModule} from "../competence/competence.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetenceLevel]),
    AuthModule,
    AlgorithmProcessingModule,
    CompetenceModule,
  ],
  providers: [CompetenceLevelService, CompetencesLevelRepository],
  controllers: [CompetenceLevelController],
  exports: [CompetenceLevelService]
})
export class CompetenceLevelModule {}
