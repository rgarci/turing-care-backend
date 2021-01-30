import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * Mapeo para la entidad Clinica
 */
@Entity()
export class Clinica {

    @PrimaryGeneratedColumn()
    clinica_id: number;

    @Column()
    nombre: string;

    @Column()
    calle: string;

    @Column()
    numero: string;

    @Column()
    codigo_postal: string;

    @Column()
    cruzamiento: string;

    @Column()
    colonia: string;

    @Column()
    municipio: string;

    @Column()
    estado: string;

    @Column()
    pais: string;

}
