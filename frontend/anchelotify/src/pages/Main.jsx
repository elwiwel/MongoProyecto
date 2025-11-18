import { useEffect, useState } from "react";
import Album from "../components/Album";
import "./Main.css";

function Main() {

    const [albums, setAlbums] = useState([]);

    async function fetchAlbums() {
        try {
            const URL_API = "http://localhost:4000/api/albumes/";
            const res = await fetch(URL_API);
            const data = await res.json();
            console.log("Datos recibidos:", data);
            setAlbums(data);   // ⬅️ Guardar en el estado
        } catch (error) {
            console.error("Error instanciando albumes:", error);
        }
    }

    useEffect(() => {
        fetchAlbums(); // ⬅️ Se ejecuta SOLO al montar
    }, []);

    return (
        <div>
            <div id="header"></div>

            <div id="grid-album">
                {albums.map(album => (
                    console.log(album.img),
                    <Album
                        key={album.id || album.nombre} // ⬅️ IMPORTANTE
                        img={album.img}
                        title={album.nombre}
                        artist={album.artista}
                        year={album.año}
                    />
                ))}
            </div>
        </div>
    );
}

export default Main;
