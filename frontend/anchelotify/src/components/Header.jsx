import "./Header.css";
import searchicon from "../assets/img/lupa.svg";
import home from "../assets/img/home.svg";
import { Link } from "react-router-dom";
import { use, useState } from "react";
import { useEffect } from "react";

function Header({setBusqueda}) {

    const [albumes, setAlbumes] = useState([]);

    async function guardarAlbumes() {

        const res = await fetch(`http://localhost:4000/api/albumes`);

        if (!res.ok) {
            console.error("Error al buscar álbumes");
            return;
        }

        const data = await res.json();
        console.log("Álbumes guardados en Header:", data);
        setAlbumes(data);
    }

    useEffect(() => {
        guardarAlbumes();
    }, []);

    function buscar(e) {
        const busqueda = e.target.value;
        console.log(albumes);
        const resultados = albumes.filter(album => 
            album.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        console.log("Resultados de búsqueda:", resultados);
        setBusqueda(resultados);
    }

    return (
        <div id="header">

            <div className="home"><Link to="/main" className="home-link"><img src={home} alt="Home" className="home-img" /></Link></div>

            <div id="flex">
                <input id="search" type="text" placeholder="¿Qué quieres escuchar?" onChange={buscar}/>
                <img src={searchicon} alt="Buscar" className="lupa" onClick={buscar} />
            </div>

            <div className="home"></div>

        </div>
    )
}

export default Header;