import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import testcover from "../assets/img/alice.jpg";

function AudioPlayer({ audioSrc }) {

    //Variables de estados para saber si está pausado y el tiempo
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioref = useRef(null);

    //Función para buscar un momento específico de la canción
    const handleSeek = (e) => {
        audioref.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    }

    //Actualizar tiempo de la canción y duración
    function handleTimeUpdate() {
        setCurrentTime(audioref.current.currentTime);
        setDuration(audioref.current.duration);
    }

    const handlePlay = () => {

        audioref.current.play();
        setIsPlaying(true);
    }

    function handlePause() {

        audioref.current.pause();
        setIsPlaying(false);
    }

    const handlePlayPause = () => {

        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    }

    //Formatear la duraciónd el audio en 'mm:ss'
    function formatDuration(durationSeconds) {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    //Efecto para detectar el cambio de tiempo de la canción y actualizarlo
    useEffect(() => {
        const audio = audioref.current;
        if (!audio) return;

        audio.addEventListener("timeupdate", handleTimeUpdate);

        //Se quita el event listener cuando se desmonta el componente
        return () => {
            if(audio){
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            }
        }
    }, []);

    return (
        <div className="player">
            <img src={testcover} alt="Portada" />

            <div className="cancion">
                {/* Input para seleccionar punto de la canción */}
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                />

                {/* Elemento audio para reproducir */}
                <audio ref={audioref} src={audioSrc} />

                {/* Enseñar el tiempo y la duración de la canción */}
                <div className="duracion">
                    <p>{formatDuration(currentTime)}</p>
                    <p>{formatDuration(duration)}</p>
                </div>

                {/* Play/Pausa */}
                <button onClick={handlePlayPause}>
                    <span className="simbolo">
                        {isPlaying ? "II" : ">"}
                    </span>
                </button>
            </div>

        </div>
    )
}

export default AudioPlayer;