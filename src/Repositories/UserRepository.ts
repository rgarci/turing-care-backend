import { EntityRepository, getRepository, Repository } from "typeorm";
import { Usuario } from "../entity/Usuario";

@EntityRepository(Usuario)
export class UserRepository extends Repository<Usuario>{
    
    findByUserId(user_id : string){
        return this.findOne(user_id);
    }

    findByUsername(username : string){
        return this.findOne(username);
    }
}