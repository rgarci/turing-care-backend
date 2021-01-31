import { DeleteResult, getCustomRepository } from "typeorm";
import { Patient } from "../entity/Patient";
import { PatientItf } from "../interfaces/PatientItf";
import { PatientRepository } from "../Repositories/PatientRepository";

/**
 * Servicio para la conexión con api de pacientes
 */
export class PatientService{

    /**
     * Crea un paciente
     * @param patientReq mensaje con info de paciente 
     */
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
        patient.operaciones_previas = patientReq.operaciones_previas;

        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        
        return patientRepo.save(patient);

    }

    /**
     * Actualiza la info de un paciente
     * @param patientReq mensaje con info de paciente
     */
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
            patient.operaciones_previas = patientReq.operaciones_previas;
            
            return patientRepo.save(patient);
        })
        
    }

    /**
     * Elimina un paciente dado un id.
     * @param id_patient id de paciente
     */
    deletePatient(id_patient : number): Promise<any>{
        let patientRepo : PatientRepository = getCustomRepository(PatientRepository);
        return patientRepo.delete(id_patient);
    }

    /**
     * Obtiene paciente por id
     * @param id id de paciente
     */
    gatPatient(id: number) : Promise<Patient[]>{
        let patientRepo = getCustomRepository(PatientRepository)
        return patientRepo.findById(id);
    }

    /**
     * Obtiene un listado de pacientes por id de doctor
     * @param id_doctor id de doctor
     */
    getPatientByDoctor(id_doctor): Promise<Patient[]>{
        let patientRepo = getCustomRepository(PatientRepository);
        return patientRepo.findByDoctor(id_doctor);
    }
}
