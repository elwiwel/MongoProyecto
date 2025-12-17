import { useEffect, useState } from "react";
import Album from "../components/Album";
import Header from "../components/Header";
import "./Main.css";
import AudioPlayer from "../components/AudioPlayer";

import testaudio from "../assets/audio/downinahole.mp3";

function Main() {

    const [albums, setAlbums] = useState([]);

    const [busqueda, setBusqueda] = useState("");

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
        fetchAlbums(); // Se ejecuta SOLO al montar
    }, []);

    useEffect(() => {
        setAlbums(busqueda.length ? busqueda : albums);
    }, [busqueda]);

    return (
        <div id="main-container">
            <Header setBusqueda={setBusqueda} />

            <div id="grid-album">
                {albums.map(album => (
                    <Album
                        key={album.id || album.nombre} // ⬅️ IMPORTANTE
                        img={album.img}
                        title={album.nombre}
                        artist={album.artista}
                        year={album.año}
                    />
                ))}
            </div>

            {/* <AudioPlayer audioSrc={testaudio}/> */}
        </div>
    );
}

export default Main;
