import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const redirectTo = `${window.location.origin}/auth/callback`;

            await axios.post(`${apiBaseUrl}/api/auth/register`, {
                email,
                password,
                redirectTo,
            });

            alert('Check your email and click the confirmation link. You will be redirected to dashboard.');


        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");

        }
    };
    return (
        <div>
            <h1>Vibely Register</h1>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link>   </p>
        </div>
    );


}
