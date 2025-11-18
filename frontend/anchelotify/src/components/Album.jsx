import "./Album.css";
import { useRef } from "react";

function Album({ img, title, artist, year, color }) {

    const pref = useRef(null);

    function hover() {
        pref.current.className = "album-cover-hover";
    }

    function unhover() {
        pref.current.className = "album-cover";
    }

    return (

        <div className="album-card">
            <img src={img} alt={title} ref={pref} className="album-cover" />
            <h3 className="album-title" onMouseEnter={hover} onMouseLeave={unhover}>{title}</h3>
            <div className="album-info">
                <p className="album-year">{year}</p>
                <p className="album-artist">{artist}</p>
            </div>
        </div>
    )
}

export default Album;