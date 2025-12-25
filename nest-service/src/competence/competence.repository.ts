import {Injectable} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Competence } from "./competence.entity";

@Injectable()
export class CompetencesRepository extends Repository<Competence> {
    constructor(private dataSource: DataSource) {
        super(Competence, dataSource.createEntityManager());
    }
}