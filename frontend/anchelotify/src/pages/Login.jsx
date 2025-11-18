import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {

    const [correo, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function register(){

    }
    

    async function submit(ev) {
        ev.preventDefault();

        const URL_API = "http://localhost:4000/api/usuarios/login";


        console.log("Correo:", correo);
        console.log("Password:", password);

        if (!correo || !password) {
            alert("Rellene todos los campos, por favor");
            return;
        }
        else {
            try {
                const res = await fetch(URL_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({correo, password})
                });

                if (!res.ok) {
                    console.error("Error HTTP:", res.status, res.statusText);
                    return;
                }

                const data = await res.json();

                console.log(data);

                if(data.contraseña === true) {
                    alert("Sesión iniciada correctamente");
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <>
        <h1 id="titulo">Anchelotify</h1>
        <div id="login">
            <h2>Inicia sesión</h2>
            <form id="credenciales" onSubmit={submit}>
                <div>
                    <label htmlFor="correo">Correo electrónico:</label> <br />
                    <input type="email" id="correo" name="correo" value={correo} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label> <br />
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <button id="submit" type="submit" onClick={()=>{console.log("Botón clicado")}}>Entrar</button>
            </form>

            <p id="preg">¿No tienes una cuenta?</p>
            <Link to={"/register"} id="volver">Regístrate</Link>
            
        </div>
        </>
    )
}

export default Login;