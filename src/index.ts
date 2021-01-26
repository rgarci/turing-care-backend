 import "reflect-metadata";
import {createConnection} from "typeorm";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { DoctorService } from "./Services/DoctorService";
import { RegisterService } from "./Services/RegisterService";
import { DoctorItf } from "./interfaces/DoctorItf";
import { nextTick } from "process";
import { RegisterItf } from "./interfaces/RegisterItf";
import { PatientService } from "./Services/PatientService";
import { PatientItf } from "./interfaces/PatientItf";

/**
 * Puerto del servidor
 */
let port = 3000;

/**
 * Crea la conexión con la bd
 */
createConnection();


var doctorSvc : DoctorService = new DoctorService();
var registerSvc : RegisterService = new RegisterService();
var patientSvc : PatientService = new PatientService();
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

/**
 * Endpoint para obtención de doctor
 */
app.get('/doctor', function(req, res){
    let id_doctor = req.query.id;
    console.log(id_doctor);
    doctorSvc.getDoctor(id_doctor).then(function (value) {
        let doc : DoctorItf = value[0];
        if(doc === undefined){
            res.status(500).send('No se encontró al doctor ' + id_doctor);
        }else{
            res.send(doc);
        }
    }).catch(function(err){
        res.status(500).send(err);
    })
});

/**
 * Endpoint para crear un doctor
 */
app.post('/doctor', function (req, res) {
    try {
        let doc : DoctorItf = req.body;
        doctorSvc.createDoctor(doc).then(function(value){
            res.send(value);
        })
    } catch (error) {
        console.log("Error al crear al doctor");
    }
});

/**
 * Endpoint para actualizar un doctor
 */
app.put('/doctor', function (req, res) {
    try {
        let doc : DoctorItf = req.body;
        doctorSvc.updateDoctor(doc).then(function(value){
            res.send(value);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});


/**
 * Endpoint para obtener registros
 */
app.get('/registro/:id', function(req, res){
    let idRegister = req.params.id;
    console.log(idRegister);  
    registerSvc.getRegister(idRegister).then(function (value){
        let register : RegisterItf = value[0];
        if(register === undefined){
            res.status(500).send('No se encontró el registro ' + idRegister);
        }else{
            res.send(register);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

/**
 * Endpoint para crear un registro
 */
app.post('/registro', function (req, res) {
    try {
        let register : RegisterItf = req.body;
        registerSvc.createRegister(register).then(function(value){
            res.send(value);
        })
    } catch (error) {
        console.log("Error al crear el registro");
    }
});

/**
 * endpoint para actualizar registro
 */
app.put('/registro', function (req, res) {
    try {
        let register : RegisterItf = req.body;
        registerSvc.updateRegister(register).then(function(value){
            res.send(value);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Endpoint para obtener los registros de un paciente
 */
app.get('/historial/:idPatient', function(req, res){
    let idPatient = req.params.idPatient;
    console.log(idPatient);  
    registerSvc.getHistorial(idPatient).then(function (value){
        
        if(value === undefined){
            res.status(500).send('No se encontró los registros del paciente ' + idPatient);
        }else{
            res.send(value);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

/**
 * Endpoint para localizar un paciente
 */
app.get('/paciente/:id', function(req, res){
    let idPatient = req.params.id;
    console.log(idPatient);  
    patientSvc.gatPatient(idPatient).then(function (value){
        let patient : PatientItf = value[0];
        if(patient === undefined){
            res.status(500).send('No se encontró al paciente ' + idPatient);
        }else{
            res.send(patient);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

/**
 * Endpoint para crear un paciente
 */
app.post('/paciente', function (req, res) {
    try {
        let paciente : PatientItf = req.body;
        patientSvc.createPatient(paciente).then(function(value){
            res.send(value);
        })
    } catch (error) {
        console.log("Error al crear al paciente");
    }
});

/**
 * Endpoint para actualizar un paciente
 */
app.put('/paciente', function (req, res) {
    try {
        let paciente : PatientItf = req.body;
        patientSvc.updatePatient(paciente).then(function(value){
            res.send(value);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * Endpoint para obtener los pacientes de un doctor
 */
app.get('/doctor/:idDoctor/pacientes', function(req, res){
    let idDoctor = req.params.idDoctor;
    console.log(idDoctor);  
    patientSvc.getPatientByDoctor(idDoctor).then(function (value){
        
        if(value === undefined){
            res.status(500).send('No se encontró al doctor ' + idDoctor);
        }else{
            res.send(value);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

/**
 * Inicia el servidor
 */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
