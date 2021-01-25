export interface RegisterItf{
    registro_id: number;
    doctor_id: number;
    paciente_id: number;
    asunto: string;
    descripcion: string;
    fecha_registro: Date;
    fecha_actualizacion: Date;
    fecha_cita: Date;
    medicamento_recetado : string;
    observaciones: string;
    seguimiento_tratamiento: string;
    sintomas: string;
    tipo_tratamiento: string;
}