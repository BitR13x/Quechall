import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Notes extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "text", unique: false })
    name: string;

    @Column({ type: "text", unique: false })
    content: string;

    @ManyToOne(() => User, user => user.notes)
    user: User;

    @CreateDateColumn({ type: "date" })
    createdAt: Date;
}
