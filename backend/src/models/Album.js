import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  artista: { type: String, required: true },
  año: { type: Number, required: true },
  img: { type: String, required: true },
  canciones: { type: Number, required: true },
  duracion: { type: String, required: true },
  generos: { 
    type: String, 
    enum: ["Rock progresivo", "Grunge", "Hard rock", "Hip hop, Rock acústico"], 
    required: true 
  }
});

const Album = mongoose.model("Album", albumSchema, "albumes");
export default Album;