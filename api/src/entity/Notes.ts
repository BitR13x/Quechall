import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Notes extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: false })
    name: string;

    @Column({ type: "text", unique: false })
    content: string;

    @Column({ type: "int" })
    OwnerId: number;

    @ManyToOne(() => User, user => user.notes)
    user: User;

    @CreateDateColumn({ type: "date" })
    createdAt: Date;
}
