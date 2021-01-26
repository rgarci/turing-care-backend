import { EntityRepository, getRepository, Repository } from "typeorm";
import { Patient } from "../entity/Patient";

/**
 * Repositorio para transaccionar con la entidad paciente
 */
@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient>{
    
    /**
     * Localiza pacientes por id de doctor
     * @param doctor id de doctor
     */
    findByDoctor(doctor: number){
        return this.find({where : {doctor_id : doctor}});
    }

    /**
     * Localiza pacientes por id
     * @param id id
     */
    findById(id : number){
        return this.find({where : { paciente_id : id}});
    }
}