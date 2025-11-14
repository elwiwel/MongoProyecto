import Usuario from "../models/Usuario.js";

class UsuariosController {

    crearUsuario = async (req, res) => {
        
    }

    buscarUsuario = async (req, res) => {
        try{
            const {correo} = req.body;

            const usuario = await Usuario.findOne({correo});

            console.log("Usuarios leídos")

            if (usuario){
                return res.json({
                    existe: true,
                    usuario
                })
            }
            else{
                return res.json({
                    existe:false
                })
            }

        }
        catch (error) {
            console.error("No se han leído los usuarios", error);
        };
    }
}

export default new UsuariosController;