import "./Header.css";
import searchicon from "../assets/img/lupa.svg";
import home from "../assets/img/home.svg";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div id="header">

            <div className="home"><Link to="/main" className="home-link"><img src={home} alt="Home" className="home-img" /></Link></div>

            <div id="flex">
                <input id="search" type="text" placeholder="¿Qué quieres escuchar?" />
                <img src={searchicon} alt="Buscar" className="lupa"/>
            </div>

            <div className="home"></div>

        </div>
    )
}

export default Header;