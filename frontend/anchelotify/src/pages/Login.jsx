import "./Login.css";

function Login() {

    return(
        <div id="login">
        <h1>Anchelotify</h1>
        <h2>Inicia sesión</h2>
        <form id="credenciales">
            <div>
            <label for="correo">Correo electrónico:</label> <br/>
            <input type="email" id="correo" name="correo" required/>
            </div>
            <div>
            <label for="contraseña">Contraseña:</label> <br/>
            <input type="password" id="contraseña" name="contraseña" required/>
            </div>

            <button type="submit">Entrar</button>
        </form>
    </div>
    )
}

export default Login;