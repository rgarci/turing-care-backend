import "reflect-metadata";
import {createConnection} from "typeorm";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { DoctorService } from "./Services/DoctorService";
import { DoctorItf } from "./interfaces/DoctorItf";
import { nextTick } from "process";

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
