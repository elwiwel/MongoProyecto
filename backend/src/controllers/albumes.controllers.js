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
            const {title} = req.body;
            console.log("Título recibido en el backend:", title);
            const album = await Album.findOne({nombre: title});
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
