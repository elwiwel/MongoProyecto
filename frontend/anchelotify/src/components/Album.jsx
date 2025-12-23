import { Link } from "react-router-dom";
import "./Album.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Album({ id, img, title, artist, year, setArtist }) {

    const navigate = useNavigate();
    const pref = useRef(null);

    function hover() {
        pref.current.className = "album-cover-hover";
    }

    function unhover() {
        pref.current.className = "album-cover";
    }

    function handleArtistClick() {
        setArtist(artist);
    }

    async function handleClick() {
        console.log(`Album ${title} clicked`);
        
        try {

            const res = await fetch(`http://localhost:4000/api/albumes/${id}`);

            const data = await res.json();
            navigate(`/album/${data._id}`);
            
        } catch (error) {
            console.error("Error al manejar el clic en el álbum", error);
        }
    }

    return (

        <div className="album-card">
            <img src={img} alt={title} ref={pref} onClick={handleClick} className="album-cover" />
            <h3 className="album-title" onMouseEnter={hover} onMouseLeave={unhover} onClick={handleClick}>{title}</h3>
            <div className="album-info">
                <p className="album-year">{year}</p>
                <p className="album-artist" onClick={handleArtistClick}>{artist}</p>
            </div>
        </div>
    )
}

export default Album;