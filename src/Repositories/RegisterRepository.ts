import { EntityRepository, Repository } from "typeorm";
import { Register } from "../entity/Register";

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register>{

    findByDoctorId(doctorid : number){
        return this.find({where : {doctor_id : doctorid}});
    }

    findById( registroid: number){
        return this.find({where : {registro_id : registroid}});
    }

    findByPatientId(pacienteid : number){
        return this.find({where : {paciente_id: pacienteid}});
    }

}