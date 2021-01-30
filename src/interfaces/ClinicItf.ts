/**
 * Interfaz para el paso de mensajes de clinicas
 */
export interface ClinicItf {
    clinica_id: number;
    nombre: string;
    calle: string;
    numero: string;
    codigo_postal:string;
    cruzamiento:string;
    colonia:string;
    municipio:string;
    estado:string;
    pais:string;
}
