import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/meta-data-roles.decorator';
import {SystemConfigService} from "./system-config.service";
import {SystemConfig} from "./system-config.entity";
import {ChangeSystemConfigDto} from "./dto/change-system-config.dto";

@UseGuards(JwtAuthGuard) 
@Controller("system-config")
export class SystemConfigController {
    constructor(private readonly systemConfigService: SystemConfigService) {}

    @Get('/:systemConfigKey')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles('admin')
    getSystemConfigByKey(
        @Param('systemConfigKey') systemConfigKey: string
    ): Promise<SystemConfig> {
        return this.systemConfigService.getSystemConfigByKey(systemConfigKey);
    }

    @Patch('/:systemConfigKey')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Roles('admin')
    changeSystemConfigByKey(
        @Body() changeSystemConfigDto: ChangeSystemConfigDto,
        @Param('systemConfigKey') systemConfigKey: string
    ): Promise<SystemConfig> {
        return this.systemConfigService.changeSystemConfigByKey(systemConfigKey, changeSystemConfigDto);
    }
}
