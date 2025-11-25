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

    async function handleClick() {
        console.log(`Album ${title} clicked`);
        
        try {

            const res = await fetch(`http://localhost:4000/api/albumes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
                });

            const data = await res.json();
            console.log("Datos del álbum:", data);
            console.log("ID del álbum:", data._id);
            
            const songres = await fetch(`http://localhost:4000/api/canciones/album/${data._id}`);
            const songdata = await songres.json();
            console.log("Canciones del álbum:", songdata);
            
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
                <p className="album-artist">{artist}</p>
            </div>
        </div>
    )
}

export default Album;