import React, { use, useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import play from "../assets/img/play.svg";
import pause from "../assets/img/pause.svg";
import { useLocation } from "react-router-dom";

function AudioPlayer({ audioUrl, imgSrc }) {

    //Variables de estados para saber si está pausado y el tiempo
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);
    const imgRef = useRef(null);

    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname == "/" || location.pathname == "/register") {
            document.querySelector(".player").classList.add("hidden");
        } else {
            document.querySelector(".player").classList.remove("hidden");
        }
    }, [location])


    useEffect(() => {
        if (imgSrc && imgRef.current) {
            imgRef.current.src = imgSrc;
            console.log("Imagen de la canción actualizada:", imgSrc);
        }
    }, [imgSrc]);


    useEffect(() => {
        if (audioUrl && audioRef.current) {
            const audio = audioRef.current;
            audioRef.current.src = audioUrl;
            setCurrentTime(0);
            setDuration(0);
            audio.addEventListener("timeupdate", handleTimeUpdate); //Lo puse para probar

            
        
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(err => console.warn("Autoplay bloqueado:", err));
        }
    }, [audioUrl]);

    //Función para buscar un momento específico de la canción
    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    }

    //Actualizar tiempo de la canción y duración
    function handleTimeUpdate() {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    }

    const handlePlay = () => {

        audioRef.current.play();
        setIsPlaying(true);

    }

    function handlePause() {

        audioRef.current.pause();
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
        const audio = audioRef.current;
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
            <img src={imgSrc} ref={imgRef} alt="Portada" />

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
                <audio ref={audioRef} src={audioUrl}/>

                {/* Enseñar el tiempo y la duración de la canción */}
                <div className="duracion">
                    <p>{formatDuration(currentTime)}</p>
                    <p>{formatDuration(duration)}</p>
                </div>

                {/* Play/Pausa */}
                <button onClick={handlePlayPause}>
                    <span className="simbolo">
                        {isPlaying ? <img src={pause} alt="Pause" /> : <img src={play} alt="Play" /> }
                    </span>
                </button>
            </div>

        </div>
    )
}

export default AudioPlayer;