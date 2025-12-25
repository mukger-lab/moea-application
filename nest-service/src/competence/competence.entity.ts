import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {CompetenceLevel} from "../competence-level/competence-level.entity";

@Entity('competence')
export class Competence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, length: 255})
    code: string;

    @Column({unique: true, length: 255})
    name: string;

    @Column({ type: 'text' })
    description: string

    @OneToMany(() => CompetenceLevel, (competenceLevel) => competenceLevel.competence, {
        cascade: true,
    })
    levels: CompetenceLevel[];
}