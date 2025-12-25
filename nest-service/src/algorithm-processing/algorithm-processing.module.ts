import { Module } from '@nestjs/common';
import { AlgorithmProcessingService } from './algorithm-processing.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  providers: [AlgorithmProcessingService],
  exports: [AlgorithmProcessingService]
})
export class AlgorithmProcessingModule {}
