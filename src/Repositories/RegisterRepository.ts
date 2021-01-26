import { EntityRepository, Repository } from "typeorm";
import { Register } from "../entity/Register";

/**
 * Repositorio para transaccionar con la entidad registro médico
 */
@EntityRepository(Register)
export class RegisterRepository extends Repository<Register>{

    /**
     * Localiza registros médicos por doctor
     * @param doctorid id de doctor
     */
    findByDoctorId(doctorid : number){
        return this.find({where : {doctor_id : doctorid}});
    }

    /**
     * Localiza registros por id
     * @param registroid id
     */
    findById( registroid: number){
        return this.find({where : {registro_id : registroid}});
    }

    /**
     * Localiza registros por paciente
     * @param pacienteid id de paciente
     */
    findByPatientId(pacienteid : number){
        return this.find({where : {paciente_id: pacienteid}});
    }

}