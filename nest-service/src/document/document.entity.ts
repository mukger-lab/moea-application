import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {DisciplineResult} from "./interfaces";
import {User} from "../auth/entities/user/user.entity";
import {CompetenceProfile} from "../competence-profile/competence-profile.entity";

@Entity('document')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    filename: string;

    @Column({
        type: 'jsonb',
        name: 'extracted_data',
        nullable: true
    })
    extractedData: DisciplineResult[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({
        name: 'user_id',
        nullable: false
    })
    userId: string;

    @ManyToOne(() => User, (user) => user.documents, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => CompetenceProfile, (profile) => profile.document)
    competenceProfile: CompetenceProfile;
}