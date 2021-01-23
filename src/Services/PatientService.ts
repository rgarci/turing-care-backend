import { DeleteResult, getCustomRepository } from "typeorm";
import { Patient } from "../entity/Patient";
import { PatientRepository } from "../Repositories/PatientRepository";

export class PatientService{
    createPatient(doctor_id : number, name : string, lastname : string, lastsecondname : string,  email : string, phone : string,
        birthdate : Date, sexo : string, alergias : string, enfermedades_cronicas: string, tratamientos_vigentes: string){
            
        let patient : Patient = new Patient();
        patient.doctor_id = doctor_id;
        patient.nombre = name;
        patient.apellido_paterno = lastname;
        patient.apellido_materno = lastsecondname;
        patient.email = email;
        patient.telefono = phone;
        patient.fecha_nacimiento = birthdate;
        patient.sexo = sexo;
        patient.alergias = alergias;
        patient.enfermedades_cronicas = enfermedades_cronicas;
        patient.tratamientos_vigentes = tratamientos_vigentes;

        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        patientRepo.save(patient);
    }

    updatePatient(id_patient : number, name : string, lastname : string, lastsecondname : string,  email : string, phone : string,
        birthdate : Date, sexo : string, alergias : string, enfermedades_cronicas: string, tratamientos_vigentes: string){
            
        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        patientRepo.findById(id_patient).then(function(value){
            let patient : Patient = value;
            patient.nombre = name;
            patient.apellido_paterno = lastname;
            patient.apellido_materno = lastsecondname;
            patient.email = email;
            patient.telefono = phone;
            patient.fecha_nacimiento = birthdate;
            patient.sexo = sexo;
            patient.alergias = alergias;
            patient.enfermedades_cronicas = enfermedades_cronicas;
            patient.tratamientos_vigentes = tratamientos_vigentes;

            patientRepo.save(patient);
        })
        
    }

    deletePatient(id_patient) : Promise<DeleteResult> {
        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        return patientRepo.delete(id_patient);
    }
}