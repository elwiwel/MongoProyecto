import Album from "../models/Album.js"

class AlbumesController {

    listarAlbumes = async (req, res) => {
        try{
            const albumes = await Album.find();
            res.json({
                success: true,
                data: albumes,
                total: albumes.length});
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
        res.status(200).json({ status: 'ok', mensaje: `Obteniendo album con ID ${req.params.id}` });
    };

    actualizarAlbum = async (req, res) => {
        res.status(200).json({ status: 'ok', mensaje: 'Album actualizado' });
    };

    eliminarAlbum = async (req, res) => {
        res.status(200).json({ status: 'ok', mensaje: 'Album eliminado' });
    };
}

export default new AlbumesController();
