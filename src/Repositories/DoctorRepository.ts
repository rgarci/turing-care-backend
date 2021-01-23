import { EntityRepository, getRepository, Repository } from "typeorm";
import { Doctor } from "../entity/Doctor";

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor>{
    findByUserId(user_id : number){
        return this.findOne(user_id);
    }

    findById(doctor_id : number){
        return this.findOne(doctor_id);
    }
}