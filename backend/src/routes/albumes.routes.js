import express from "express";
import albumesController from "../controllers/albumes.controllers.js";

const route = express.Router();

route.get("/", albumesController.listarAlbumes); //Obtener todos los productos
route.get("/:id", albumesController.obtenerAlbum); //Buscar por id
route.put("/:id", albumesController.actualizarAlbum);
route.delete("/:id", albumesController.eliminarAlbum);

export default route;