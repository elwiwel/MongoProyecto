import { Link } from "react-router-dom";
import "./Register.css";
import { useState } from "react";


function Register() {

    const pCreado = document.querySelector("#feedback");

    const [nombre, setName] = useState("");
    const [correo, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(ev) {
        ev.preventDefault();
        console.log("SUBMIT EJECUTADO");

        const URL_API = "http://localhost:4000/api/usuarios/register";


        console.log("Nombre:", nombre);
        console.log("Correo:", correo);
        console.log("Password:", password);

        if (!correo || !password || !nombre) {
            alert("Rellene todos los campos, por favor");
            return;
        }
        else {
            try {
                const res = await fetch(URL_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, password })
                });

                if (!res.ok) {
                    console.error("Error HTTP:", res.status, res.statusText);
                    return;
                }

                const data = await res.json();
                console.log(data);

                if (data.creado === true) {
                    pCreado.innerHTML = "¡Felicidades! Ya puedes entrar con tu nueva cuenta.";

                } else if (data.existe === true) {
                    alert("Este correo ya existe. Por favor, introduzca otro.") //Hacer una tarjetita que salga por el lado
                }
                

            }
            catch (error) {
                console.error(error.message);
            }
        }
    }

    return (

        <div id="login">
            <h2>Introduce tus datos:</h2>
            <p id="subt">(Todos los campos son obligatorios)</p>
            <form id="credenciales" onSubmit={submit}>

                <div>
                    <label htmlFor="nombre">Nombre:</label> <br />
                    <input type="nombre" id="nombre" name="nombre" value={nombre} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="correo">Correo electrónico:</label> <br />
                    <input type="email" id="correo" name="correo" value={correo} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label> <br />
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button id="submit" type="submit">Crear cuenta</button>
            </form>
            <p id="feedback"></p>

            <Link to={"/"} id="volver">Volver a inicio de sesión</Link>
        </div>

    )
}

export default Register;