import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

/**
 * Mapeo para la entidad paciente
 */
@Entity('paciente')
export class Patient{
    @PrimaryGeneratedColumn()
    paciente_id: number;

    @Column()
    doctor_id: number;

    @Column()
    nombre: string;

    @Column()
    apellido_paterno: string;

    @Column()
    apellido_materno: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    fecha_nacimiento: Date;

    @Column()
    sexo: string;

    @Column()
    alergias: string;

    @Column()
    operaciones_previas: string;

    @Column()
    enfermedades_cronicas: string;

    @Column()
    tratamientos_vigentes: string;
}