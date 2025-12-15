import { useRef } from "react";
import "./Song.css";



function Song({ id, idArchivo, number, title, artist, album, duration, setCurrentSongUrl }) {

    function formatoDuracion(duracion) {
        const minutes = Math.floor(duracion / 60);
        const seconds = Math.floor(duracion % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    async function getSongAudio() {
        try {
            console.log(idArchivo);
            const API_URI = `http://localhost:4000/api/canciones/stream/${idArchivo}`
            const res = await fetch(API_URI);
            
            if(!res.ok){
                console.error("Error al obtener canción");
                return;
            }

            const audioBlob = await res.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            console.log("URL audio:", audioUrl);

            setCurrentSongUrl(audioUrl);

        } catch (error) {
            console.error("No se pudo procesar el stream:", error);
        }
    }

    return (
        <div className="song-row" onClick={getSongAudio}>
            <div className="izq">
                <div className="song-number">{number}</div>
                <div className="datos">
                    <div className="song-title">{title}</div>
                    <div className="song-artist">{artist}</div>
                </div>
            </div>
            <div className="song-album">{album}</div>
            <div className="song-duration">{formatoDuracion(duration)}</div>
        </div>
    );
}

export default Song;