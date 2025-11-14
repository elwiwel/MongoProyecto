import "./Login.css";

function Login() {

    const form = document.querySelector("form");
    

    function submit(ev) {
        ev.preventDefault();
        const email = ev.target.correo.value;
        const contraseña = ev.target.contraseña.value;      //Usar ev.target en React. Si no, no funciona

        if(!email || !contraseña) {
            alert("Rellene todos los campos, por favor");
        }
    }

    return(
        <div id="login">
        <h1>Anchelotify</h1>
        <h2>Inicia sesión</h2>
        <form id="credenciales" onSubmit={submit}>
            <div>
            <label htmlFor="correo">Correo electrónico:</label> <br/>
            <input type="email" id="correo" name="correo" />
            </div>
            <div>
            <label htmlFor="contraseña">Contraseña:</label> <br/>
            <input type="password" id="contraseña" name="contraseña" />
            </div>

            <button id="submit" type="submit">Entrar</button>
        </form>
    </div>
    )
}

export default Login;