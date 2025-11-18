import Usuario from "../models/Usuario.js";

class UsuariosController {

    crearUsuario = async (req, res) => {

        try {
            const { nombre, correo, password } = req.body;

            const existe = await Usuario.findOne({ email: correo.toLowerCase() });

            if (existe) {

                return res.json({
                    existe: true,
                    creado: false
                })

            } else {

                const nuevoUsuario = await Usuario.create({ nombre: nombre, email: correo, contraseña: password });
                return res.json({
                    existe: false,
                    creado: true,
                    nuevoUsuario
                })
            }

        } catch (error) {
            console.error("No se ha podido crear la cuenta", error);
        }

    }

    buscarUsuario = async (req, res) => {
        try {
            const { correo, password } = req.body;

            const usuario = await Usuario.findOne({ email: correo.toLowerCase() });

            console.log(password);

            console.log("Usuarios leídos")

            if (usuario) {
                const { contraseña, ...usuarioSafe } = usuario._doc; //usuarioSafe coge todo menos la contraseña

                if (password == contraseña) {
                    return res.json({
                        existe: true,
                        contraseña: true
                    })
                } else {
                    return res.json({
                        existe: true,
                        contraseña: false
                    })

                }
            }
            else {
                return res.json({
                    existe: false
                })
            }

        }
        catch (error) {
            console.error("No se han leído los usuarios", error);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        };
    }
}

export default new UsuariosController;