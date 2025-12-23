import "./AlbumPage.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Song from "../components/Song.jsx";
import { useParams } from "react-router-dom";
import AlbumHeader from "../components/AlbumHeader.jsx";

function AlbumPage({setCurrentSongUrl, setCurrentSongImg}) {

    const [albumDetails, setAlbumDetails] = useState({});
    const [songs, setSongs] = useState([]);
    const {id} = useParams();

    async function albumInfo() {
        const res = await fetch(`http://localhost:4000/api/albumes/${id}`);
        const data = await res.json();
        console.log("Datos del álbum:", data);
        setAlbumDetails(data);
    }

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
        albumInfo();
        fetchSongs(); // ⬅️ Se ejecuta SOLO al montar
    }, []);

    return (
        <div className="album-page">

            <Header />

            <div className="album-content">
                
                <AlbumHeader 
                title={albumDetails.nombre}
                artist={albumDetails.artista}
                year={albumDetails.año}
                img={albumDetails.img}
                />

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
                        setCurrentSongImg={setCurrentSongImg}
                    />
                ))} 
                </div>
            </div>

        </div>
    )
}

export default AlbumPage;