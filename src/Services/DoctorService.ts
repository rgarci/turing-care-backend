import { Doctor } from "../entity/Doctor";
import * as fs from 'fs';
import { Usuario } from "../entity/Usuario";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repositories/UserRepository";

import { DoctorRepository } from "../Repositories/DoctorRepository";
import { DoctorItf } from "../interfaces/DoctorItf";

/**
 * Servicio para la conexión con api de doctores
 */


export class DoctorService{
    /**
     * Crea un médico
     * @param d mensaje con info de dotor
     */
    createDoctor(d : DoctorItf) : Promise<Doctor>{
        
        let doc  = new Doctor();
        doc.clinica_id = d.clinica_id;
        doc.nombre = d.nombre;
        doc.apellido_paterno = d.apellido_paterno;
        doc.apellido_materno = d.apellido_materno;
        doc.curp = d.curp;
        doc.especialidad = d.especialidad;
        doc.email = d.email;
        doc.telefono = d.telefono;
        doc.status = true;

        let user = new Usuario();
        user.usuario = d.email;
        user.password = d.email;
        user.role = 'doctor';

        let userRepo = getCustomRepository(UserRepository);
        
        return userRepo.save(user).then(function(value){
            fs.mkdir('./files/' + value.user_id, (err) => {
                if (err) throw err;
                });

            fs.writeFile('./files/' + value.user_id + '/cedula.txt', d.url_cedula, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });
            fs.writeFile('./files/' + value.user_id + '/foto.txt', d.url_foto, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });

            doc.url_cedula = 'files/' + value.user_id + '/cedula';
            doc.url_foto = 'files/' + value.user_id + '/foto';

            doc.user_id = value.user_id;
            let doctorRepo = getCustomRepository(DoctorRepository);

            return doctorRepo.save(doc);

        }).catch(function(error){
            throw new Error('Error al crear al usuario' + error);
        });
    }

    /**
     * Actualiza un doctor
     * @param d mensaje con info de doctor
     */
    updateDoctor(d : DoctorItf) : Promise<Doctor>{

        let doctorRepo = getCustomRepository(DoctorRepository);
        return doctorRepo.findById(d.doctor_id).then(function(value){
            let doc = value[0];
            doc.nombre = d.nombre;
            doc.apellido_paterno = d.apellido_paterno;
            doc.apellido_materno = d.apellido_materno;
            doc.curp = d.curp;
            doc.especialidad = d.especialidad;
            doc.email = d.email;
            doc.telefono = d.telefono;
            doc.status = d.status;

            if(d.url_cedula){
                fs.writeFile('./files/' + value[0].user_id + '/cedula.txt', d.url_cedula, {encoding : 'base64'}, function(err){
                    if (err) throw err;
                });
            }
           if(d.url_foto) {
               fs.writeFile('./files/' + value[0].user_id + '/foto.txt', d.url_foto, {encoding : 'base64'}, function(err){
                   if (err) throw err;
               });
           }

            return doctorRepo.save(doc);
        })
    }

    /**
     * Elimina un doctor dado el id
     * @param id_doctor id de doctor
     */
    deleteDoctor(id_doctor : number){
        let doctorRepo = getCustomRepository(DoctorRepository);
        doctorRepo.delete(id_doctor);
    }

    /**
     * Obtener doctor por id
     * @param id id de doctor
     */
    getDoctor(id : number) : Promise<Doctor[]>{
        let doctorRepo = getCustomRepository(DoctorRepository);
        return doctorRepo.findById(id);
    }

    /**
     * Obtiene el doctor por el user_id
     * @param id_user id del usuario
     */
    getDoctorByUser(id_user : number): Promise<Doctor>{
        let doctorRepo = getCustomRepository(DoctorRepository);
        return doctorRepo.findByUserId(id_user).then(function(value){
            return value[0];
        }).catch(function(error){
            throw new Error('Error al obtener al doctor' + error);
        });
    }
}
