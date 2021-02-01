import {EntityRepository, Repository} from "typeorm";
import {Clinica} from "../entity/Clinica";

/**
 * Repositorio para transaccionar con la entidad clinica
 */
@EntityRepository(Clinica)
export class ClinicRepository extends Repository<Clinica>{

    /**
     * Busca clinicas por nombre
     * @param nombre nombre de clinica
     */
    findByName(nombre : string){
        return this.find({where : {nombre : nombre}});
    }

    /**
     * Busca clinicas por id
     * @param clinica_id id de clinica
     */
    findById(clinica_id){
        return this.find({where : {clinica_id : clinica_id}});
    }

    /**
     * Busca todas las clinicas
     */
    all(){
        return this.find();
    }
}
