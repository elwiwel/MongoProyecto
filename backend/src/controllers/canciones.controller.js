import Cancion from "../models/Cancion.js";
import mongodb, { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

class CancionesController {

    listarCanciones = async (req, res) => {
        try {
            const albumId = req.params.id;
            console.log("ID del álbum recibido en el backend:", albumId);
            const canciones = await Cancion.find({albumId: albumId});
            res.json(canciones);
            console.log("Canciones leídas:", canciones);
        } catch (error) {
            console.error("No se han leído las canciones", error);
        }
    }



    obtenerCancion = async (req, res) => {
        try {
            const id = req.params.id;

            const cancion = await Cancion.findOne({_id: id});
            res.json(cancion);
            console.log("Canción obtenida:", cancion);
            console.log("id archivo:", cancion.archivo);
        } catch (error) {
            console.error("No se ha obtenido la canción:", error);
        }
    }

    

    getCancionStream = async (req, res) => {
    try {
        const idCancion = req.params.id;

        const db = mongoose.connection.db;

        const bucket = new mongodb.GridFSBucket(db, {
            bucketName: "cancionesBucket"
        });

        const downloadStream = bucket.openDownloadStream(new ObjectId(idCancion));

        // Tipo MIME básico (puedes mejorarlo por extensión)
        res.set("Content-Type", "audio/mpeg");

        downloadStream.on("error", (err) => {
            console.error("Error al obtener la canción:", err);
            res.status(404).send("Canción no encontrada");
        });

        downloadStream.pipe(res);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno");
    }
}


}

export default new CancionesController();