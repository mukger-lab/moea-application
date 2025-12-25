import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { CompetenceModule } from './competence/competence.module';
import { AlgorithmProcessingModule } from './algorithm-processing/algorithm-processing.module';
import {CompetenceLevelModule} from "./competence-level/competence-level.module";
import {SystemConfigModule} from "./system-config/system-config.module";
import {DocumentModule} from "./document/document.module";
import {CompetenceProfileModule} from "./competence-profile/competence-profile.module";
import {DatabaseSeedService} from "./database-seed/database-seed.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        }
      }
    }),
    AuthModule,
    SystemConfigModule,
    AlgorithmProcessingModule,
    CompetenceModule,
    CompetenceLevelModule,
    DocumentModule,
    CompetenceProfileModule,
  ],
  controllers: [],
  providers: [
    DatabaseSeedService
  ]
})
export class AppModule {}

