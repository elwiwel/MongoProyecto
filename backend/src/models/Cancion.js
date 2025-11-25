import mongoose from "mongoose";

const cancionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  duracion: { type: Number, required: true },
  genero: {
    type: String,
    enum: ["Rock progresivo", "Grunge", "Hard rock", "Hip hop, Rock acústico"],
    required: true
  },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true }
});

const Cancion = mongoose.model("Cancion", cancionSchema, "canciones");
export default Cancion;