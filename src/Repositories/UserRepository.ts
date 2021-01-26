import { EntityRepository, getRepository, Repository } from "typeorm";
import { Usuario } from "../entity/Usuario";

/**
 * Repositorio para transaccionar con la entidad usuario
 */
@EntityRepository(Usuario)
export class UserRepository extends Repository<Usuario>{
    
    /**
     * Localiza usuarios por id
     * @param user_id id
     */
    findByUserId(user_id : string){
        return this.findOne(user_id);
    }

    /**
     * Localiza usuarios por username
     * @param username username
     */
    findByUsername(username : string){
        return this.findOne(username);
    }
}