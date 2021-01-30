import {ClinicItf} from "../interfaces/ClinicItf";
import {Clinica} from "../entity/Clinica";
import {ClinicRepository} from "../Repositories/ClinicRepository";
import {DeleteResult, getCustomRepository} from "typeorm";

/**
 * Servicio para la conexión con api de clinicas
 */
export class ClinicService{

    /**
     * Crea una clinica
     * @param clinicReq mensaje con info de clinicas
     */
    createClinic( clinicReq : ClinicItf) : Promise<Clinica>{

        let clinic : Clinica = new Clinica();
        clinic.nombre = clinicReq.nombre;
        clinic.calle = clinicReq.calle;
        clinic.numero = clinicReq.numero;
        clinic.codigo_postal = clinicReq.codigo_postal;
        clinic.cruzamiento = clinicReq.cruzamiento;
        clinic.colonia = clinicReq.colonia  ;
        clinic.municipio = clinicReq.municipio;
        clinic.estado = clinicReq.estado;
        clinic.pais = clinicReq.pais;

        let clinicRepo : ClinicRepository = getCustomRepository(ClinicRepository);

        return clinicRepo.save(clinic);

    }

    /**
     * Actualiza la info de una clinica
     * @param clinicReq mensaje con info de clinica
     */
    updateClinic(clinicReq : ClinicItf){

        let clinicRepo : ClinicRepository = getCustomRepository(ClinicRepository);

        return clinicRepo.findById(clinicReq.clinica_id).then(function(value){
            let clinic = value[0];
            clinic.nombre = clinicReq.nombre;
            clinic.calle = clinicReq.calle;
            clinic.numero = clinicReq.numero;
            clinic.codigo_postal = clinicReq.codigo_postal;
            clinic.cruzamiento = clinicReq.cruzamiento;
            clinic.colonia = clinicReq.colonia  ;
            clinic.municipio = clinicReq.municipio;
            clinic.estado = clinicReq.estado;
            clinic.pais = clinicReq.pais;

            return clinicRepo.save(clinic);
        })

    }

    /**
     * Elimina un clinica dado un id
     * @param id_clinic id de clinica
     */
    deleteClinic(id_clinic : number) : Promise<DeleteResult> {
        let clinicRepo : ClinicRepository = getCustomRepository(ClinicRepository);
        return clinicRepo.delete(id_clinic);
    }

    /**
     * Obtiene clinica por id
     * @param id id de clinica
     */
    getClinic(id: number) : Promise<Clinica>{
        let clinicRepo : ClinicRepository = getCustomRepository(ClinicRepository);
        return clinicRepo.findById(id).then(function(value){
            return value[0];
        }).catch(function(error){
            throw new Error('Error al buscar la clinica' + error);
        });
    }

    /**
     * Obtiene un listado de clinicas por nombre
     * @param name id de doctor
     */
    getClinicByName(name: string): Promise<Clinica[]>{
        let clinicRepo = getCustomRepository(ClinicRepository);
        return clinicRepo.findByName(name);
    }

    /**
     * Obtiene un listado de clinicas
     */
    getClinics(): Promise<Clinica[]>{
        let clinicRepo = getCustomRepository(ClinicRepository);
        return clinicRepo.all();
    }
}
