import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

/**
 * Mapeo para la entidad Usuario
 */
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
