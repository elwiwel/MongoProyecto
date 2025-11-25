import Cancion from "../models/Cancion.js";

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


}

export default new CancionesController();