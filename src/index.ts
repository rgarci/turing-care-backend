import "reflect-metadata";
import {createConnection} from "typeorm";
import { DoctorService } from "./Services/DoctorService";

createConnection().then(async connection => {

    console.log("La conexión fue correcta");

    let svc = new DoctorService();
    svc.deleteDoctor(6);
    

}).catch(error => console.log(error));
