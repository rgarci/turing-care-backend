import { EntityRepository, getRepository, Repository } from "typeorm";
import { Doctor } from "../entity/Doctor";

/**
 * Repositorio para transaccionar con la entidad doctor
 */
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor>{

    /**
     * Busca doctores por id de usuario
     * @param userid id de usuario
     */
    findByUserId(userid : number){
        return this.find({where : {user_id : userid}});
    }

    /**
     * Busca doctores por id
     * @param doctor_id id
     */
    findById(doctor_id : number){
        return this.find({where : {doctor_id : doctor_id}});
    }
}
