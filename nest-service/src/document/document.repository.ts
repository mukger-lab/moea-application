import {Injectable} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Document } from "./document.entity";

@Injectable()
export class DocumentsRepository extends Repository<Document> {
    constructor(private dataSource: DataSource) {
        super(Document, dataSource.createEntityManager());
    }
}
