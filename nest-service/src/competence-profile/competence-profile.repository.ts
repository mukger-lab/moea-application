import {Injectable} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import {CompetenceProfile} from "./competence-profile.entity";

@Injectable()
export class CompetenceProfileRepository extends Repository<CompetenceProfile> {
    constructor(private dataSource: DataSource) {
        super(CompetenceProfile, dataSource.createEntityManager());
    }
}