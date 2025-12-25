import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CompetenceProfileData} from "./interfaces";
import { Document } from "../document/document.entity";

@Entity('competence_profile')
export class CompetenceProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'jsonb',
        name: 'profile_data',
        nullable: false
    })
    profileData: CompetenceProfileData[];

    @Column({
        type: 'jsonb',
        nullable: true
    })
    algorithmMetadata: Record<string, any>;

    @Column({
        name: 'document_id',
        nullable: false
    })
    documentId: string;

    @OneToOne(() => Document, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'document_id' })
    document: Document;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}