 import "reflect-metadata";
import {createConnection} from "typeorm";
import { DoctorService } from "./Services/DoctorService";
import { RegisterService } from "./Services/RegisterService";
import { DoctorItf } from "./interfaces/DoctorItf";
import { RegisterItf } from "./interfaces/RegisterItf";
import { PatientService } from "./Services/PatientService";
import { PatientItf } from "./interfaces/PatientItf";
import { UserService } from "./Services/UserService";
import { Usuario } from "./entity/Usuario";
 import {ClinicService} from "./Services/ClinicService";
 import {ClinicItf} from "./interfaces/ClinicItf";

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
var usrSvc : UserService = new UserService();
var clinicSvc: ClinicService = new ClinicService();
var refreshTokens = {} ;
var SECRET = "SECRETO_PARA_ENCRIPTACION" ;
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken') ;
var randtoken = require('rand-token');
var nodemailer = require("nodemailer");
var app = express();
var cors = require('cors');

//app.use(bodyParser.json({extended:true}), bodyParser.urlencoded({ extended: true }))//, cors());
 app.use(bodyParser.json({limit: '10mb', extended: true}),
     bodyParser.urlencoded({limit: '10mb', extended: true})
 ,cors() );

app.post('/login', function (req, res, next) { 
    var username = req.body.username; 
    var password = req.body.password;
    usrSvc.getUserByUsername(username).then(function(value){
        let user : Usuario = value;
        var usuario = {
            'username' : user.usuario,
            'role' : user.role
        }
        if(user.password === password){
            doctorSvc.getDoctorByUser(user.user_id).then(function(value){
                var token = jwt.sign(usuario, SECRET, { expiresIn: 300 }) ;
                var refreshToken = randtoken.uid(256) ;
                refreshTokens[refreshToken] = username;
                res.json({token: 'JWT ' + token, 
                refreshToken: refreshToken, 
                user_id : user.user_id, 
                username : user.usuario,
                doctor : {
                    doctor_id : value.doctor_id,
                    nombre : value.nombre,
                    apellido_paterno : value.apellido_paterno,
                    apellido_materno : value.apellido_materno
                }}) ;
            }).catch(function(err){
                console.log(err)
                res.status(500).send(err);
            });
        }else{
            res.send(401);
        }
    }).catch(function(err){
        console.log(err)
        res.status(500).send(err);
    });
  });

  app.post('/token', function (req, res, next) {
    var username = req.body.username;
    var refreshToken = req.body.refreshToken;
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
      var user = {
        'username': username,
        'role': 'admin'
      };
      var token = jwt.sign(user, SECRET, { expiresIn: 300 });
      res.json({token: 'JWT ' + token});
    }
    else {
      res.sendStatus(401);
    }
  });

  app.post('/token/reject', function (req, res, next) { 
    var refreshToken = req.body.refreshToken ;
    if(refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken];
    } 
    res.send(204) 
  });

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

var opts = {jwtFromRequest : "", secretOrKey :""} ;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  //If the token has expiration, raise unauthorized
  var expirationDate = new Date(jwtPayload.exp * 1000);
  if(expirationDate < new Date()) {
    return done(null, false);
  }
  var user = jwtPayload;
  done(null, user);
}))

/**
 * Endpoint para obtención de doctor
 */
app.get('/doctor/:id', passport.authenticate('jwt'), function(req, res){
    let id_doctor = req.params.id;
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
 * Endpoint para obtención de la información de doctor publica
 */
app.get('/info/doctor/:id', function(req, res, next){
    let id_doctor = req.params.id;
    console.log(id_doctor);
    doctorSvc.getDoctor(id_doctor).then(function (value) {
        let doc : DoctorItf = value[0];
        doc.clinica_id = null;
        doc.user_id=null;
        doc.url_cedula="";
        doc.url_foto = "";
        doc.status = null;

        console.log(doc);
        
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
app.post('/doctor', passport.authenticate('jwt'), function (req, res) {
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
app.put('/doctor', passport.authenticate('jwt'), function (req, res) {
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
app.get('/registro/:id', passport.authenticate('jwt'), function(req, res){
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
app.post('/registro', passport.authenticate('jwt'), function (req, res) {
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
app.put('/registro', passport.authenticate('jwt'), function (req, res) {
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
  * Endpoint para eliminar un registro
  */
 app.delete('/registro/:id', passport.authenticate('jwt'), function (req, res) {
     try {
         let id  = req.params.id;
         registerSvc.deleteRegister(id).then(function(value){
             const response = {
                 message: 'Registro eliminado',
                 idRegistro: id
             }
             res.status(200).send(response);
         })
     } catch (error) {
         res.status(500).send(error);
     }
 });

/**
 * Endpoint para obtener los registros de un paciente
 */
app.get('/historial/:idPatient', passport.authenticate('jwt'), function(req, res){
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
app.get('/paciente/:id', passport.authenticate('jwt'), function(req, res){
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
app.post('/paciente', passport.authenticate('jwt'), function (req, res) {
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
app.put('/paciente', passport.authenticate('jwt'), function (req, res) {
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
  * Endpoint para eliminar un paciente y sus registros.
  */
 app.delete('/paciente/:id', passport.authenticate('jwt'), function (req, res) {
     try {
         let id  = req.params.id;
         registerSvc.deleteHistorial(id).then(function (value) {
             patientSvc.deletePatient(id).then(function(value){
                 const response = {
                     message: 'Paciente eliminado',
                     idPaciente: id
                 }
                 res.status(200).send(response);
             })
         })
     } catch (error) {
         res.status(500).send(error);
     }
 });

/**
 * Endpoint para obtener los pacientes de un doctor
 */
app.get('/doctor/:idDoctor/pacientes', passport.authenticate('jwt'), function(req, res){
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
  * Endpoint para localizar una clinica
  */
 app.get('/clinica/:id', passport.authenticate('jwt'), function(req, res){
     let idClinic = req.params.id;
     console.log(idClinic);
     clinicSvc.getClinic(idClinic).then(function (value){
         let clinic : ClinicItf = value;
         if(clinic === undefined){
             res.status(500).send('No se encontró la clinica ' + idClinic);
         }else{
             res.send(clinic);
         }
     }).catch(function(err){
         res.status(500).send(err);
     });
 });

 /**
  * Endpoint para localizar una clinica por nombre o todas las clinicas
  */
 app.get('/clinica', passport.authenticate('jwt'), function(req, res){
     let name = req.query.name;
     if(name) {
         console.log(name);
         clinicSvc.getClinicByName(name).then(function (value){
             let clinic : ClinicItf = value[0];
             if(clinic === undefined){
                 res.status(500).send('No se encontró la clinica ' + name);
             }else{
                 res.send(clinic);
             }
         }).catch(function(err){
             res.status(500).send(err);
         });
     } else {
         clinicSvc.getClinics().then(function (value){
             if(!value){
                 res.status(500).send('No se encontraron clinicas');
             }else{
                 res.send(value);
             }
         }).catch(function(err){
             res.status(500).send(err);
         });
     }

 });

 /**
  * Endpoint para enviar correo de la información de registro
  */
 app.post("/sendmail", (req, res) => {
     console.log("request came");
     let data = req.body;
     sendMail(data,(info) => {
         const response = {
             response: info,
             messageUrl: nodemailer.getTestMessageUrl(info)
         }
         res.send(response);
     }).catch((error) => {
         console.log(error)
         res.status(400).send(error);
     });
 });

 /**
  * Método para enviar correo de la información de registro,
  * utiliza una cuenta de SMTP del generador de correos ethereal
  */
 async function sendMail(data, callback) {
     // create reusable transporter object using the default SMTP transport
     let testAccount = await nodemailer.createTestAccount();
     let transporter = nodemailer.createTransport({

         host: 'smtp.ethereal.email',
         port: 587,
         secure: false,
         auth: {
             user: testAccount.user,
             pass: testAccount.pass
         },
     });

     let att = {}
     if (data.url_foto) {
         att = {
             filename: "Foto.jpg",
             contentType: 'image/jpeg',
             content: Buffer.from(data.url_foto.split("base64,")[1], "base64"),
         }
     }
     let mailOptions = {
         from: 'TuringCare<dev@turingCare.com>', // sender address
         to: 'admin@TuringCare.com',//data.email,
         subject: "Datos de registro", // Subject line
         html: `<h1>Hola,hemos recibido una solicitud de registro de doctor: </h1><br>
            <p>Nombre: ${data.nombre}</p>
            <p>Apellidos: ${data.apellido_paterno} ${data.apellido_materno}</p>
            <p>correo: ${data.email}</p>
            <p>telefono: ${data.telefono}</p>
            <p>curp: ${data.curp}</p>
            <p>cedula: ${data.url_cedula}</p>
            <p>especialidad: ${data.especialidad}</p>
            <p>Clinica: ${data.clinica}</p>
            <p>Dirección clinica: ${data.direccion_clinica}</p>
            <h4>¡Gracias!</h4>`,
         attachments: [
             att
         ]
     };

     // send mail with defined transport object
     let info = await transporter.sendMail(mailOptions);
     callback(info);
 }

/**
 * Inicia el servidor
 */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
