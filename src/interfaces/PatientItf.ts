export interface PatientItf{
    paciente_id: number;
    doctor_id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    email: string;
    telefono: string;
    fecha_nacimiento: Date;
    sexo: string;
    alergias: string;
    operaciones_previas: string;
    enfermedades_cronicas: string;
    tratamientos_vigentes: string;
}