import { Doctor } from "../entity/Doctor";
import * as fs from 'fs';
import { Usuario } from "../entity/Usuario";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../Repositories/UserRepository";

import { DoctorRepository } from "../Repositories/DoctorRepository";
import { DoctorItf } from "../interfaces/DoctorItf";

export class DoctorService{
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

            fs.writeFile('./files/' + value[0].user_id + '/cedula.txt', d.url_cedula, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });
            fs.writeFile('./files/' + value[0].user_id + '/foto.txt', d.url_foto, {encoding : 'base64'}, function(err){
                if (err) throw err;
            });

            return doctorRepo.save(doc);
        })
    }

    deleteDoctor(id_doctor : number){
        let doctorRepo = getCustomRepository(DoctorRepository);
        doctorRepo.delete(id_doctor);
    }

    getDoctor(id : number) : Promise<Doctor[]>{
        let doctorRepo = getCustomRepository(DoctorRepository);
        return doctorRepo.findById(id);
    }
}