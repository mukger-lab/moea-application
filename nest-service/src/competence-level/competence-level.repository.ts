import {Injectable} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CompetenceLevel } from "./competence-level.entity";

@Injectable()
export class CompetencesLevelRepository extends Repository<CompetenceLevel> {
    constructor(private dataSource: DataSource) {
        super(CompetenceLevel, dataSource.createEntityManager());
    }
}