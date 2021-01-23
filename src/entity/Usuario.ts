import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    usuario: string;

    @Column()
    password: string;

    @Column()
    role: string;
}
