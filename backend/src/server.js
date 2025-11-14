import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import albumesRoutes from "./routes/albumes.routes.js" //Importamos las rutas de productos

//Cargar variables del archivo .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Conecto a Mongo
await connectDB();



//Ruta base
app.use("/api/albumes", albumesRoutes);

app.get("/", (req, res) => {
    
    res.send("Servidor funcionando correctamente")
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

