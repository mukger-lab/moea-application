import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('system_config')
export class SystemConfig {
    @PrimaryColumn({
        type: 'varchar',
        length: 100
    })
    key: string;

    @Column({
        type: 'text',
        nullable: false
    })
    value: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
}