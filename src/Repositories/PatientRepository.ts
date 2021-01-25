import { EntityRepository, getRepository, Repository } from "typeorm";
import { Patient } from "../entity/Patient";

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient>{
    
    findByDoctor(doctor: number){
        return this.find({where : {doctor_id : doctor}});
    }

    findById(id : number){
        return this.find({where : { paciente_id : id}});
    }
}