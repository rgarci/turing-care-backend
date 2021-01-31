import { Register  } from "../entity/Register";
import  * as fs from "fs";
import {DeleteResult, getCustomRepository} from "typeorm";
import { RegisterRepository } from "../Repositories/RegisterRepository";

import { RegisterItf } from "../interfaces/RegisterItf";
import { DoctorRepository } from "../Repositories/DoctorRepository";
import { PatientRepository } from "../Repositories/PatientRepository";

/**
 * Servicio para la conexión con api de registros
 */
export class RegisterService{

    /**
     * Crea un registro médico
     * @param registerReq mensaje con info de registro
     */
    createRegister(registerReq : RegisterItf) : Promise<Register>{
        
        let register = new Register();
        register.asunto = registerReq.asunto;
        register.descripcion = registerReq.descripcion;
        register.doctor_id = registerReq.doctor_id;
        register.fecha_actualizacion = new Date();
        register.fecha_cita = registerReq.fecha_cita;
        register.fecha_registro = new Date();
        register.medicamento_recetado = registerReq.medicamento_recetado;
        register.observaciones = registerReq.observaciones;
        register.paciente_id = registerReq.paciente_id;
        register.seguimiento_tratamiento = registerReq.seguimiento_tratamiento;
        register.sintomas = registerReq.sintomas;
        register.tipo_tratamiento = registerReq.tipo_tratamiento;

       
        let doctorRepo : DoctorRepository = getCustomRepository(DoctorRepository);

        return doctorRepo.findById(registerReq.doctor_id).then(function(value){

            let patientRepo : PatientRepository = getCustomRepository(PatientRepository);

            return patientRepo.findById(registerReq.paciente_id).then(function(value){
                 let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
                return registerRepo.save(register);
            }).catch(function(error){
                throw new Error('Error al crear registro' + error);
            });

        }).catch(function(error){
            throw new Error('Error al crear al crear registro' + error);
        });
    }

    /**
     * Actualiza un registro médico
     * @param registerReq info con mensaje de registro
     */
    updateRegister(registerReq : RegisterItf) : Promise<Register>{
         let registerRepo = getCustomRepository(RegisterRepository);

         return registerRepo.findById(registerReq.registro_id).then(function(value){
            let register = value[0];
            register.asunto = registerReq.asunto;
            register.descripcion = registerReq.descripcion;
            register.fecha_actualizacion = new Date();
            register.fecha_cita = registerReq.fecha_cita;
            register.medicamento_recetado = registerReq.medicamento_recetado;
            register.observaciones = registerReq.observaciones;
            register.seguimiento_tratamiento = registerReq.seguimiento_tratamiento;
            register.sintomas = registerReq.sintomas;
            register.tipo_tratamiento = registerReq.tipo_tratamiento;

            return registerRepo.save(register);

         });
    }

    /**
     * Elimina un registro médico dado el id
     * @param id_register id de registro
     */
    deleteRegister( id_register: number){
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        return registerRepo.delete(id_register);
    }

    /**
     * Obtiene un registro dado el id
     * @param id_register id de registro
     */
    getRegister(id_register) : Promise<Register[]>{
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        return registerRepo.findById(id_register);
    }

    /**
     * Obtiene los registros de un paciente
     * @param id_patient id de paciente
     */
    getHistorial(id_patient): Promise<Register[]>{
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        return registerRepo.findByPatientId(id_patient);
    }

    /**
     * Elimina los registros de un paciente
     * @param id_patient id de paciente
     */
    deleteHistorial(id_patient): Promise<DeleteResult>{
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        return registerRepo.delete({ paciente_id: id_patient });
    }
}
