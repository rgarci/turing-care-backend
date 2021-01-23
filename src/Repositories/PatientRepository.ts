import { EntityRepository, getRepository, Repository } from "typeorm";
import { Patient } from "../entity/Patient";

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient>{
    findByDoctor(doctor){
        return this.find({where : {id_doctor : doctor}});
    }

    findById(id){
        return this.findOne(id);
    }
}