import { DeleteResult, getCustomRepository } from "typeorm";
import { Patient } from "../entity/Patient";
import { Register } from "../entity/Register";
import { PatientItf } from "../interfaces/PatientItf";
import { PatientRepository } from "../Repositories/PatientRepository";

export class PatientService{
    createPatient( patientReq : PatientItf) : Promise<Patient>{
            
        let patient : Patient = new Patient();
        patient.doctor_id = patientReq.doctor_id;
        patient.nombre = patientReq.nombre;
        patient.apellido_paterno = patientReq.apellido_paterno;
        patient.apellido_materno = patientReq.apellido_materno;
        patient.email = patientReq.email;
        patient.telefono = patientReq.telefono;
        patient.fecha_nacimiento = patientReq.fecha_nacimiento;
        patient.sexo = patientReq.sexo;
        patient.alergias = patientReq.alergias;
        patient.enfermedades_cronicas = patientReq.enfermedades_cronicas;
        patient.tratamientos_vigentes = patientReq.tratamientos_vigentes;

        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        
        return patientRepo.save(patient);

    }

    updatePatient(patientReq : PatientItf){
            
        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);

        return patientRepo.findById(patientReq.paciente_id).then(function(value){
            let patient = value[0];
            patient.nombre = patientReq.nombre ;
            patient.apellido_paterno = patientReq.apellido_paterno;
            patient.apellido_materno = patientReq.apellido_materno;
            patient.email = patientReq.email;
            patient.telefono = patientReq.telefono;
            patient.fecha_nacimiento = patientReq.fecha_nacimiento;
            patient.sexo = patientReq.sexo;
            patient.alergias = patientReq.alergias;
            patient.enfermedades_cronicas = patientReq.enfermedades_cronicas;
            patient.tratamientos_vigentes = patientReq.tratamientos_vigentes;
            
            return patientRepo.save(patient);
        })
        
    }

    deletePatient(id_patient : number) : Promise<DeleteResult> {
        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        return patientRepo.delete(id_patient);
    }

    gatPatient(id: number) : Promise<Patient[]>{
        let patientRepo = getCustomRepository(PatientRepository);
        return patientRepo.findById(id);
    }

    getPatientByDoctor(id_doctor): Promise<Patient[]>{
        let patientRepo = getCustomRepository(PatientRepository);
        return patientRepo.findByDoctor(id_doctor);
    }
}