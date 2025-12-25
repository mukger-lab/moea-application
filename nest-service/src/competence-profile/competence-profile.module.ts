import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AlgorithmProcessingModule } from 'src/algorithm-processing/algorithm-processing.module';
import {CompetenceProfileService} from "./competence-profile.service";
import {CompetenceProfileRepository} from "./competence-profile.repository";
import {CompetenceModule} from "../competence/competence.module";
import {SystemConfigModule} from "../system-config/system-config.module";
import {DocumentModule} from "../document/document.module";
import {CompetenceProfile} from "./competence-profile.entity";
import {CompetenceProfileController} from "./competence-profile.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetenceProfile]),
    AuthModule,
    AlgorithmProcessingModule,
    CompetenceModule,
    SystemConfigModule,
    DocumentModule,
  ],
  providers: [CompetenceProfileService, CompetenceProfileRepository],
  controllers: [CompetenceProfileController],
  exports: [CompetenceProfileService]
})
export class CompetenceProfileModule {}
