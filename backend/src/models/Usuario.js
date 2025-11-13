import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contraseña: {type: String, required: true}
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");
export default Usuario;