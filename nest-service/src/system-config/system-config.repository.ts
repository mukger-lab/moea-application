import {Injectable} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import {SystemConfig} from "./system-config.entity";

@Injectable()
export class SystemConfigRepository extends Repository<SystemConfig> {
    constructor(private dataSource: DataSource) {
        super(SystemConfig, dataSource.createEntityManager());
    }
}