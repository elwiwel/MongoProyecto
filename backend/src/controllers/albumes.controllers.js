import Album from "../models/Album.js"

class AlbumesController {

    listarAlbumes = async (req, res) => {
        try{
            const albumes = await Album.find();
            res.json(albumes);
            console.log("Archivos leídos")
        }
        catch (error) {
            console.error("No se han leído los álbumes", error);
        };
        
        
    }

    crearAlbum = async (req, res) => {
        res.status(201).json({ status: 'ok', mensaje: 'Album creado' });
    };


    obtenerAlbum = async (req, res) => {
        try {
            const albumId = req.params.id;
            console.log("ID del álbum recibido en el backend:", albumId);
            const album = await Album.findById(albumId);
            console.log("Álbum leído:", album);
            res.json(album);
        } catch (error) {
            console.error("Error al obtener el álbum", error);
        }
    };

    actualizarAlbum = async (req, res) => {
        res.status(200).json({ status: 'ok', mensaje: 'Album actualizado' });
    };

    eliminarAlbum = async (req, res) => {
        res.status(200).json({ status: 'ok', mensaje: 'Album eliminado' });
    };
}

export default new AlbumesController();
