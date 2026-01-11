import { useEffect, useState } from "react";
import Album from "../components/Album";
import Header from "../components/Header";
import "./Main.css";

function Main() {

    const [albums, setAlbums] = useState([]);
    const [albumesMostrados, setAlbumesMostrados] = useState([]);

    const [busqueda, setBusqueda] = useState("");

    const [artistSearch, setArtist] = useState(null);

    async function fetchAlbums() {
        try {
            const URL_API = "http://localhost:4000/api/albumes/";
            const res = await fetch(URL_API);
            const data = await res.json();
            console.log("Datos recibidos:", data);
            setAlbums(data);
            setAlbumesMostrados(data);   // ⬅️ Guardar en el estado
        } catch (error) {
            console.error("Error instanciando albumes:", error);
        }
    }

    function filtrarPorArtista(artist) {
        console.log("Filtrando por artista:", artist);
        const filteredAlbums = albums.filter(album => album.artista === artist);
        setAlbumesMostrados(filteredAlbums);
    }

    useEffect(() => {
        fetchAlbums(); // Se ejecuta SOLO al montar
        setArtist(null);
    }, []);
    
    useEffect(() => {
        if (artistSearch) {
            filtrarPorArtista(artistSearch);
        }
    }, [artistSearch]);

    useEffect(() => {
        console.log("busqueda:", busqueda);
        setAlbumesMostrados(busqueda.length > 0 ? busqueda : albums);
    }, [busqueda]);

    return (
        <div id="main-container">
            <Header setBusqueda={setBusqueda} setArtist={setArtist} />

            <div id="grid-album">
                {albumesMostrados.map(album => (
                    <Album
                        key={album.id || album.nombre} // ⬅️ IMPORTANTE
                        id={album._id}
                        img={album.img}
                        title={album.nombre}
                        artist={album.artista}
                        year={album.año}
                        setArtist={setArtist}
                    />
                ))}
            </div>

        </div>
    );
}

export default Main;
