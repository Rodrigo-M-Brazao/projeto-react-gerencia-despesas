import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,password})
            });
            // const data = await response.json()
            if(response.ok){
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('Login successful');
                navigate('/home')
            } else{
                setError('Dados inexistentes')
            }

        } catch (error) {
           console.error(error) 
        }
    }


    return (
        <div>
             <h1>Login</h1>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Usuário"
                />
            </div>
            <br/>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
            </div>
            <br/>
            <button onClick={handleLogin}>Entrar</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;