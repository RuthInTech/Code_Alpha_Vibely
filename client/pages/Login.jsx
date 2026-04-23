import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };
    return (
        <div>
            <h1>Vibely Login</h1>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>No account? <Link to="/register">Register</Link>  </p>
        </div>
    );
}


