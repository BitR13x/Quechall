import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Passwords } from "./Passwords";
import { Notes } from "./Notes";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "text" })
    role: string;

    @Column({ unique: true, type: "varchar", length: "130" })
    userName: string;

    @Column({ type: "text" })
    hsPassword: string;

    @Column({ type: "text" })
    hsMasterPass: string;

    @Column( "int", { default: 0 })
    tokenVersion: number;

    @Column("simple-json", { default: { passwdlen: 20, symbols: true, numbers: true, lowercase: true, uppercase: true } })
    passwdGen: { passwdlen: number, symbols: boolean, numbers: boolean, lowercase: boolean, uppercase: boolean };

    @OneToMany(() => Passwords, passwords => passwords.user)
    @JoinColumn()
    passwords: Passwords;

    @OneToMany(() => Notes, notes => notes.user)
    @JoinColumn()
    notes: Notes;

    @CreateDateColumn({ type: "date" })
    createdAt: Date;

    @CreateDateColumn({ type: "date" })
    updatedAt: Date;
}
