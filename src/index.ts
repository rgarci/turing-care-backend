import "reflect-metadata";
import {createConnection} from "typeorm";
import { DoctorService } from "./Services/DoctorService";

createConnection().then(async connection => {

    console.log("La conexión fue correcta");

    let svc = new DoctorService();
    svc.createDoctor(1, "primera", "prueba", "doctor", "curp", "ZXN0ZSBlcyB1biBlamVtcGxv", "ZXN0ZSBlcyB1biBlamVtcGxv",
    "pediatria", "email@doctor.com", "99999999", "myPass");
    

}).catch(error => console.log(error));
