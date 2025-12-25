import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import {SystemConfig} from "./system-config.entity";
import {SystemConfigService} from "./system-config.service";
import {SystemConfigRepository} from "./system-config.repository";
import {SystemConfigController} from "./system-config.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([SystemConfig]),
        AuthModule,
    ],
    providers: [SystemConfigService, SystemConfigRepository],
    controllers: [SystemConfigController],
    exports: [SystemConfigService]
})
export class SystemConfigModule {}
