import express from "express";
import cancionesController from "../controllers/canciones.controller.js";

const route = express.Router();

route.get("/album/:id", cancionesController.listarCanciones); //Obtener canciones de un álbum
//route.get("/:id", cancionesController.obtenerAlbum); //Buscar por id

route.get("/stream/:nombre", cancionesController.getCancionStream);

export default route;