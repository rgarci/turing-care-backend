import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
/**
 * Mapeo para la entidad Doctor
 */
@Entity()
export class Doctor {

    @PrimaryGeneratedColumn()
    doctor_id: number;

    @Column()
    clinica_id: number;

    @Column()
    nombre: string;

    @Column()
    apellido_paterno: string;

    @Column()
    apellido_materno: string;

    @Column()
    curp: string;

    @Column()
    url_cedula: string;

    @Column()
    url_foto: string;

    @Column()
    especialidad: string;

    @Column()
    status: boolean;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    user_id: number;

}
