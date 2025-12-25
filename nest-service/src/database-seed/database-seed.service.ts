import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    async onModuleInit() {
        try {
            const result = await this.dataSource.query('SELECT count(*) FROM competence');
            const count = parseInt(result[0].count, 10);

            if (count > 0) {
                return;
            }
        } catch (e) {
            console.log('DSSOMI001: Tables might not exist yet. TypeORM should handle creation soon.');
        }

        console.log('DSSOMI002: Database is empty. Running initial SQL script...');

        const filePath = '/app/initial-data.sql';

        if (!fs.existsSync(filePath)) {
            console.log(`DSSOMI003: SQL file not found at: ${filePath}`);
            return;
        }

        const sqlScript = fs.readFileSync(filePath, 'utf8');

        try {
            await this.dataSource.query(sqlScript);
            console.log('DSSOMI004: SQL script executed successfully. Competences loaded.');
        } catch (error) {
            console.log('DSSOMI005: Error executing SQL script', error);
        }
    }
}