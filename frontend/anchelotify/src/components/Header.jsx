import "./Header.css";
import searchicon from "../assets/img/lupa.svg";
import home from "../assets/img/home.svg";
import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { useEffect } from "react";

function Header({setBusqueda, setArtist}) {

    const [albumes, setAlbumes] = useState([]);

    const navigate = useNavigate();

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
        const resultados = albumes.filter(album => 
            album.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        console.log("Resultados de búsqueda:", resultados);
        setBusqueda(resultados);
    }

    function volverHome() {
        navigate("/main");
        setArtist(null);
        document.getElementById("search").value = "";
        setBusqueda([]);
    }

    return (
        <div id="header">

            <div className="home"><img src={home} alt="Home" className="home-img" onClick={volverHome} /></div>

            <div id="flex">
                <input id="search" type="text" placeholder="¿Qué quieres escuchar?" onChange={buscar} />
                <img src={searchicon} alt="Buscar" className="lupa" onClick={buscar} />
            </div>

            <div className="home"></div>

        </div>
    )
}

export default Header;