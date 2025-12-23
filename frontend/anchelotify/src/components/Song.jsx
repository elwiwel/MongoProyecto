import { useRef } from "react";
import "./Song.css";



function Song({ id, idArchivo, number, title, artist, album, duration, setCurrentSongUrl, setCurrentSongImg }) {

    function formatoDuracion(duracion) {
        const minutes = Math.floor(duracion / 60);
        const seconds = Math.floor(duracion % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    function songSelected() {
        console.log(`Canción ${title} seleccionada`);
        showSongImage();
        getSongAudio();
    }

    async function showSongImage() {
        console.log(id);
        const res = await fetch(`http://localhost:4000/api/canciones/${id}`);
        const data = await res.json();
        const albumId = data.albumId;

        console.log("Album ID:", albumId);
        const albumRes = await fetch(`http://localhost:4000/api/albumes/${albumId}`);
        const albumData = await albumRes.json();
        setCurrentSongImg(albumData.img);
    }


    async function getSongAudio() {
        try {
            const API_URI = `http://localhost:4000/api/canciones/stream/${idArchivo}`
            const res = await fetch(API_URI);

            if (!res.ok) {
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
        <div className="song-row" onClick={songSelected} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 1)"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgb(15, 15, 15)"}>
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