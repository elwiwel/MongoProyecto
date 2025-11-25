import "./Song.css";



function Song({ number, title, artist, duration }) {

    function formatoDuracion(duracion) {
        const minutes = Math.floor(duracion / 60);
        const seconds = Math.floor(duracion % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    return (
        <div className="song-row">
            <div className="izq">
                <div className="song-number">{number}</div>
                <div className="datos">
                    <div className="song-title">{title}</div>
                    <div className="song-artist">{artist}</div>
                </div>
            </div>
            <div className="song-duration">{formatoDuracion(duration)}</div>
        </div>
    );
}

export default Song;