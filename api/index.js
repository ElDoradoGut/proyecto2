import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { registerUser, login, updateUser, getUsers } from "./controllers/controller.User.js";
import { createEvent, getEvents } from "./controllers/controller.Event.js";
import { createTeam, getTeams, registerEvent } from "./controllers/controller.Team.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Conexion exitosa"));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Error")
})

app.listen(4000, () => console.log("Funciona el servidor correctamente"));
app.post("/user/registerUser", registerUser);
app.post("/user/login", login);
app.post("/user/:_id", updateUser);
app.get("/user/list", getUsers);

app.post("/event/createEvent", createEvent);
app.get("/event/list", getEvents)

app.post("/team/createTeam", createTeam);
app.post("/team/registerEvent", registerEvent);
app.get("/team/list", getTeams)