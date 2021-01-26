/**
 * Interfaz para el paso de mensajes de doctor
 */
export interface DoctorItf{
    doctor_id: number;
    clinica_id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    url_cedula: string;
    url_foto: string;
    especialidad: string;
    status: boolean;
    email: string;
    telefono: string;
    user_id: number;
}