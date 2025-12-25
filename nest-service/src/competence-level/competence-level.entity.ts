import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import { EcfProficiencyLevel } from './enums';
import {Competence} from "../competence/competence.entity";

@Entity('competence_level')
@Unique(['competenceId', 'proficiencyLevel'])
export class CompetenceLevel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        name: 'proficiency_level',
        type: 'enum',
        enum: EcfProficiencyLevel,
        nullable: false
    })
    proficiencyLevel: EcfProficiencyLevel;

    @Column({
        name: 'competence_id',
        nullable: false
    })
    competenceId: string;

    @ManyToOne(() => Competence, (competence) => competence.levels, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: 'competence_id' })
    competence: Competence;
}
