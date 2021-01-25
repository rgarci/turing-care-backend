 import "reflect-metadata";
import {createConnection} from "typeorm";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { DoctorService } from "./Services/DoctorService";
import { RegisterService } from "./Services/RegisterService";
import { DoctorItf } from "./interfaces/DoctorItf";
import { nextTick } from "process";
import { RegisterItf } from "./interfaces/RegisterItf";

let port = 3000;

createConnection();

var doctorSvc : DoctorService = new DoctorService();
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

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

var registerSvc : RegisterService = new RegisterService();

app.get('/registro/:id', function(req, res){
    let idRegister = req.params.id;
    console.log(idRegister);  
    registerSvc.getRegister(idRegister).then(function (value){
        let register : RegisterItf = value[0];
        if(register === undefined){
            res.status(500).send('No se encontró al doctor ' + idRegister);
        }else{
            res.send(register);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.post('/registro', function (req, res) {
    try {
        let register : RegisterItf = req.body;
        registerSvc.createRegister(register).then(function(value){
            res.send(value);
        })
    } catch (error) {
        console.log("Error al crear al doctor");
    }
});

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


app.get('/historial/:idPatient', function(req, res){
    let idRegister = req.params.idPatient;
    console.log(idRegister);  
    registerSvc.getHistorial(idRegister).then(function (value){
        
        if(value === undefined){
            res.status(500).send('No se encontró al doctor ' + idRegister);
        }else{
            res.send(value);
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
