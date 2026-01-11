import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {

    const [correo, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const alerta = document.querySelector("#alerta-text");
    const alertaDiv = document.querySelector("#alerta-hidden");

    async function submit(ev) {
        ev.preventDefault();

        alertaDiv.classList.contains("alerta") ? alertaDiv.classList.replace("alerta", "alerta-hidden") : null;

        const URL_API = "http://localhost:4000/api/usuarios/login";

        console.log("Correo:", correo);
        console.log("Password:", password);

        if (!correo || !password) {
            alerta.innerHTML = "Rellene todos los campos, por favor";
            alertaDiv.classList.replace("alerta-hidden", "alerta");
            return;
        }
        else {
            try {
                const res = await fetch(URL_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correo, password })
                });

                if (!res.ok) {
                    console.error("Error HTTP:", res.status, res.statusText);
                    return;
                }

                const data = await res.json();

                if (data.contraseña === true) {
                    alert("Sesión iniciada correctamente");
                    navigate(`/main`);
                } else if (data.contraseña === false || data.existe === false) {
                    alerta.innerHTML = "El correo y/o la contraseña son incorrectos";
                    alertaDiv.classList.replace("alerta-hidden", "alerta");
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <div id="login-container">
            <h1 id="titulo">Anchelotify</h1>
            <div id="login">
                <h2>Inicia sesión</h2>
                <form id="credenciales" onSubmit={submit}>
                    <div>
                        <label htmlFor="correo">Correo electrónico:</label> <br />
                        <input type="email" id="correo" name="correo" value={correo} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label> <br />
                        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div id="alerta-hidden" className="alerta-hidden"><p id="alerta-text"></p></div>

                    <button id="submit" type="submit" >Entrar</button>
                </form>

                <p id="preg">¿No tienes una cuenta?</p>
                <Link to={"/register"} id="register">Regístrate</Link>

            </div>
        </div>
    )
}

export default Login;