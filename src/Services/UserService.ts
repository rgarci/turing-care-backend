import { Usuario } from "../entity/Usuario";
import { DeleteResult, getCustomRepository } from "typeorm";
import { UserRepository } from "../Repositories/UserRepository";
/**
 * Servicio para la conexión con api de usuarios
 */
export class UserService{

    /**
     * Crea un usuario  
     * @param username username
     * @param pass contraseña
     * @param role rol
     */
    createUser(username : string, pass : string, role: string) : Promise<Usuario>{

        let user = new Usuario();
        user.usuario = username;
        user.password = pass;
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.save(user);
    }

    /**
     * Actualiza la contraseña de un usuario
     * @param username username
     * @param pass contraseña nueva
     */
    updatePassword(username: string, pass : string): Promise<Usuario>{
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.findByUsername(username).then(function(value){
            let user : Usuario = value[0];
            user.password = pass;
            return userRepo.save(user);
        }).catch(function(err){
            throw new Error("Error al actualizar la contraseña de " + username); 
        });
    }

    /**
     * Elimina un usuario dado el id
     * @param id_user id de usuario
     */
    deleteUser(id_user) : Promise<DeleteResult>{
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.delete(id_user);
    }

    getUserByUsername(username : string) : Promise<Usuario>{
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.findByUsername(username).then(function(value){
            return value[0];
        }).catch(function(err){
            throw new Error("Error en la búsqueda de usuario " + username);
        });
    }
}