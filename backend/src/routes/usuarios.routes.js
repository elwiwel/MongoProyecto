import express from "express";
import usuariosController from "../controllers/usuarios.controller.js";

const route = express.Router();


route.get("/:id", usuariosController.buscarUsuario);

route.post("/login", usuariosController.buscarUsuario);

route.post("/register", usuariosController.crearUsuario);



export default route;