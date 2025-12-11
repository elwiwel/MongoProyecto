import Cancion from "../models/Cancion.js";
import mongodb, { MongoClient } from "mongodb";

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


    

    getCancionStream = async (req, res) => {
    try {
        const nombre = req.params.nombre;

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db("musica");

        const bucket = new mongodb.GridFSBucket(db, {
            bucketName: "cancionesBucket"
        });

        const downloadStream = bucket.openDownloadStreamByName(nombre);

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