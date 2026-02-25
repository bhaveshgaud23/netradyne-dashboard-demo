import { useState } from "react";
import '../login.css';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateInputs = () => {
        if (!username.trim() || !password.trim()) {
            setError("Username and Password are required");
            return false;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        setError("");
        return true;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username.trim(),
                        password
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);

            onLogin();
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="containerLogin">
            <div className="cardLogin">
                <h2 className="titleLogin">Login</h2>

                {error && <p className="errorLogin">{error}</p>}

                <input
                    className="inputLogin"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="inputLogin"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="buttonLogin" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}