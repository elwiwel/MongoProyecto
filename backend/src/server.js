import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import albumesRoutes from "./routes/albumes.routes.js" //Importamos las rutas de productos
import usuariosRoutes from "./routes/usuarios.routes.js";
import cancionesRoutes from "./routes/canciones.routes.js";

//Cargar variables del archivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Conecto a Mongo
await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontend = path.join(__dirname, "../");
const reactDistPath = path.join(frontend, "..", "frontend", "anchelotify", "dist");

console.log("Ruta donde Express busca React:", reactDistPath);

app.use(express.static(path.join(reactDistPath)));

//Ruta base
app.use("/api/albumes", albumesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/canciones", cancionesRoutes);

app.use((req, res) => {
    
    res.sendFile(path.join(reactDistPath, "index.html"));

});


// import mongoose from "mongoose";

// app.get("/test-db", async (req, res) => {
//   try {
//     const collections = await mongoose.connection.db.listCollections().toArray();
//     res.json({ message: "Conectado a la BD", collections });
//   } catch (error) {
//     res.status(500).json({ error: "Error al acceder a la BD", details: error });
//   }
// });


const PORT = process.env.PORT || 3000;

try{
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${PORT}`);
    })
}
catch (error) {
    console.error("Error al iniciar el servidor:", error);
}

