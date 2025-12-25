import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {SystemConfigRepository} from "./system-config.repository";
import {SystemConfig} from "./system-config.entity";
import {ChangeSystemConfigDto} from "./dto/change-system-config.dto";
import {similarityThresholdKey} from "./constants";

@Injectable()
export class SystemConfigService {
    constructor(  
        @InjectRepository(SystemConfigRepository)
        private readonly systemConfigRepository: SystemConfigRepository,
    ) {}

    async getSystemConfigByKey(systemConfigKey: string): Promise<SystemConfig> {
        return await this.systemConfigRepository.findOneBy({key: systemConfigKey});
    }

    async changeSystemConfigByKey(
        systemConfigKey: string,
        changeSystemConfigDto: ChangeSystemConfigDto
    ): Promise<SystemConfig> {
        const systemConfig = await this.getSystemConfigByKey(systemConfigKey) || {key: systemConfigKey};

        if (systemConfigKey === similarityThresholdKey && changeSystemConfigDto.value !== undefined) {
            const numericValue = Number(changeSystemConfigDto.value);

            if (isNaN(numericValue) || numericValue < 0 || numericValue > 1) {
                throw new BadRequestException(
                    `Value for '${similarityThresholdKey}' system variable must be a number between 0.0 and 1.0`
                );
            }
        }

        Object.assign(systemConfig, changeSystemConfigDto);

        try {
            return await this.systemConfigRepository.save(systemConfig);
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }
}
