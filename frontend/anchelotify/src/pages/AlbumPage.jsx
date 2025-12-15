import "./AlbumPage.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Song from "../components/Song.jsx";
import { useParams } from "react-router-dom";

function AlbumPage({setCurrentSongUrl}) {

    const [songs, setSongs] = useState([]);
    const {id} = useParams();

    async function fetchSongs() {
        try {
            
            console.log("Fetch songs called for album ID:", id);

            const URL_API = `http://localhost:4000/api/canciones/album/${id}`;
            const res = await fetch(URL_API);
            const data = await res.json();
            console.log("Datos recibidos en las canciones:", data);
            setSongs(data);   // ⬅️ Guardar en el estado
            console.log(songs);
        } catch (error) {
            console.error("Error instanciando canciones:", error);
        }
    }

    useEffect(() => {
        fetchSongs(); // ⬅️ Se ejecuta SOLO al montar
    }, []);

    return (
        <div className="album-page">

            <Header />

            <div className="album-content">
                <div className="album-header">
                    <h1></h1>
                </div>

                <div className="track-list">
                    {songs.map((track, index) => (
                    <Song
                        key={track.id || track.titulo} // ⬅️ IMPORTANTE
                        id={track._id}
                        idArchivo={track.archivo}
                        number={index + 1}
                        title={track.titulo}
                        artist={track.artista}
                        album={track.album}
                        duration={track.duracion}
                        setCurrentSongUrl={setCurrentSongUrl}
                    />
                ))} 
                </div>
            </div>

        </div>
    )
}

export default AlbumPage;