import "./Header.css";
import searchicon from "../assets/img/lupa.svg";

function Header() {
    return (
        <div id="header">
            <div id="flex">
                <input id="search" type="text" placeholder="¿Qué quieres escuchar?" />
                <img src={searchicon} alt="Buscar" />
            </div>
            
        </div>
    )
}

export default Header;