import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";

@Entity()
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "text", unique: true })
    name: string;

    @CreateDateColumn({ type: "date" })
    createdAt: Date;
}
