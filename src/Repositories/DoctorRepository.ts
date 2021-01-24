import { EntityRepository, getRepository, Repository } from "typeorm";
import { Doctor } from "../entity/Doctor";

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor>{
    findByUserId(userid : number){
        return this.find({where : {user_id : userid}});
    }

    findById(doctor_id : number){
        return this.find({where : {doctor_id : doctor_id}});
    }
}