import { Doctor } from "../entity/Doctor";
import * as fs from 'fs';
import { Usuario } from "../entity/Usuario";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repositories/UserRepository";

import { DoctorRepository } from "../Repositories/DoctorRepository";

export class DoctorService{
    createDoctor(clinicId : number, name : string, lastname : string, lastsecondname : string, curp : string, 
        cedula : string, foto : string, especialidad: string, email : string, phone : string, password : string){
        
        let doc  = new Doctor();
        doc.clinica_id = clinicId;
        doc.nombre = name;
        doc.apellido_paterno = lastname;
        doc.apellido_materno = lastsecondname;
        doc.curp = curp;
        doc.especialidad = especialidad;
        doc.email = email;
        doc.telefono = phone;
        doc.status = true;

        let user = new Usuario();
        user.usuario = email;
        user.password = password;
        user.role = 'doctor';

        let userRepo = getCustomRepository(UserRepository);
        
        userRepo.save(user).then(function(value){
            fs.mkdir('./files/' + value.user_id, (err) => {
                if (err) throw err;
                });

            fs.writeFile('./files/' + value.user_id + '/cedula.txt', cedula, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });
            fs.writeFile('./files/' + value.user_id + '/foto.txt', foto, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });

            doc.url_cedula = 'files' + value.user_id + '/cedula';
            doc.url_foto = 'files' + value.user_id + '/foto';

            doc.user_id = value.user_id;
            let doctorRepo = getCustomRepository(DoctorRepository);

            doctorRepo.save(doc).then(function(value){
                return value;
            }).catch(function(error){
                throw new Error('Error al crear al doctor' + error);
            })

        }).catch(function(error){
            throw new Error('Error al crear al usuario' + error);
        });
    }

    updateDoctor(id_doctor : number, name : string, lastname : string, lastsecondname : string, curp : string, 
        cedula : string, foto : string, especialidad: string, email : string, phone : string, status : boolean){

        let doctorRepo = getCustomRepository(DoctorRepository);
        doctorRepo.findById(id_doctor).then(function(value){
            let doc = value;
            doc.nombre = name;
            doc.apellido_paterno = lastname;
            doc.apellido_materno = lastsecondname;
            doc.curp = curp;
            doc.especialidad = especialidad;
            doc.email = email;
            doc.telefono = phone;
            doc.status = status;

            fs.writeFile('./files/' + value.user_id + '/cedula.txt', cedula, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });
            fs.writeFile('./files/' + value.user_id + '/foto.txt', foto, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });

            doctorRepo.save(doc).then(function(value){
                return value;
            })
            .catch(function(error){
                throw new Error('Error al actualizar al doctor' + error);
            })
        })
    }

    deleteDoctor(id_doctor : number){
        let doctorRepo = getCustomRepository(DoctorRepository);
        doctorRepo.delete(id_doctor);
    }
}