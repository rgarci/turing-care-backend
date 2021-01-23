import { Usuario } from "../entity/Usuario";
import { DeleteResult, getCustomRepository } from "typeorm";
import { UserRepository } from "../Repositories/UserRepository";

export class UserService{

    createUser(username : string, pass : string, role: string) : Promise<Usuario>{

        let user = new Usuario();
        user.usuario = username;
        user.password = pass;
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.save(user);
    }

    updatePassword(username: string, pass : string): Promise<Usuario>{
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.findByUsername(username).then(function(value){
            let user : Usuario = value;
            user.password = pass;
            return userRepo.save(user);
        }).catch(function(err){
            throw new Error("Error al actualizar la contraseña de " + username); 
        })
    }

    deleteUser(id_user) : Promise<DeleteResult>{
        let userRepo : UserRepository = getCustomRepository(UserRepository);
        return userRepo.delete(id_user);
    }
}