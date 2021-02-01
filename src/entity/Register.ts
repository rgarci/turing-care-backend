import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

/**
 * Mapeo para la entidad Registro médico
 */
@Entity('registro')
export class Register {

    @PrimaryGeneratedColumn()
    registro_id: number;

    @Column()
    doctor_id: number;

    @Column()
    paciente_id: number;

    @Column()
    asunto: string;

    @Column()
    descripcion: string;

    @Column()
    fecha_registro: Date;

    @Column()
    fecha_actualizacion: Date;

    @Column()
    fecha_cita: Date;

    @Column()
    medicamento_recetado : string;

    @Column()
    observaciones: string;

    @Column()
    seguimiento_tratamiento: string;

    @Column()
    sintomas: string;

    @Column()
    tipo_tratamiento: string;

}
