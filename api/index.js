import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Conexion exitosa"));

app.use(cors());

app.use(helmet());

app.get("/", (req,res)=>{
    res.send("Error")
})

app.listen(4000, ()=>console.log("Funciona el servidor correctamente"))