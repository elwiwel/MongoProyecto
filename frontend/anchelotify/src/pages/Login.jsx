import "./Login.css";
import { useState } from "react";

function Login() {


    

    async function submit(ev) {
        ev.preventDefault();

        const URL_API = "http://localhost:4000/api/usuarios";

            //Usar ev.target en React. Si no, no funciona

        console.log("Tu correo es:", email);

        if (!email || !contraseña) {
            alert("Rellene todos los campos, por favor");
        }
        else {
            try {
                const res = await fetch(URL_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });

                if (!res.ok) {
                    console.error("Error HTTP:", res.status, res.statusText);
                    return;
                }

                const data = await res.json();

                console.log(data);
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <div id="login">
            <h1>Anchelotify</h1>
            <h2>Inicia sesión</h2>
            <form id="credenciales" onSubmit={submit}>
                <div>
                    <label htmlFor="correo">Correo electrónico:</label> <br />
                    <input type="email" id="correo" name="correo" value={correo} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña:</label> <br />
                    <input type="password" id="contraseña" name="contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <button id="submit" type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login;