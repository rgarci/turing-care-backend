import { Register  } from "../entity/Register";
import  * as fs from "fs";
import { getCustomRepository } from "typeorm";
import { RegisterRepository } from "../Repositories/RegisterRepository";

import { RegisterItf } from "../interfaces/RegisterItf";
import { DoctorRepository } from "../Repositories/DoctorRepository";
import { PatientRepository } from "../Repositories/PatientRepository";

export class RegisteService{

    createRegister(registerReq : RegisterItf) : Promise<Register>{
        
        let register = new Register();
        register.asunto = registerReq.asunto;
        register.descripcion = registerReq.descripcion;
        register.doctor_id = registerReq.doctor_id;
        register.fecha_actualizacion = new Date();
        register.fecha_cita = registerReq.fecha_cita;
        register.fecha_registro = registerReq.fecha_registro;
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
                throw new Error('Error al crear al usuario' + error);
            });

        }).catch(function(error){
            throw new Error('Error al crear al usuario' + error);
        });
    }

    deleteRegister( id_register: number){
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        registerRepo.delete(id_register);
    }

    getRegister(id_register) : Promise<Register[]>{
        let registerRepo : RegisterRepository = getCustomRepository(RegisterRepository);
        return registerRepo.findById(id_register);
    }

}