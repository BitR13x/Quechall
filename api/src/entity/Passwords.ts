import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Passwords extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", unique: false })
    name: string;

    @Column({ type: "text", unique: false })
    content: string;

    @Column({ type: "int" })
    OwnerId: number;

    @ManyToOne(() => User, user => user.passwords)
    user: User;

    @CreateDateColumn({ type: "date" })
    createdAt: Date;
}
