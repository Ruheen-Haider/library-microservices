import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";


function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError("");
            const res = await api.post("/auth/login", { username, password });

            console.log("RESPONSE:", res.data);

            const token = res.data.token;
            const role = res.data.role;

            console.log("Before login()");
            localStorage.setItem("username", username);
            login(token, role);

            console.log("After login()");

            console.log("Before navigation");

            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "LIBRARIAN") {
                navigate("/librarian");
            } else {
                navigate("/user");
            }

            console.log("After navigation");

        } catch (err) {
            console.log("ACTUAL ERROR ", err);

            let errorMessage = "Login failed";

            if (err.response?.data) {
                if (typeof err.response.data === "string") {
                    errorMessage = err.response.data;
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);

        }
        };

        return (
            <div className="login-container">
                <div className="login-card">
                    <h2>
                        Library Login
                    </h2>
                    <input placeholder="username" onChange={e =>
                        setUsername(e.target.value)} />
                    <input placeholder="password" onChange={e =>
                        setPassword(e.target.value)} />

                    {/* ✅ ERROR MESSAGE */}
                    {error && (
                        <p style={{
                            color: "#ff4d4f",
                            marginTop: "10px",
                            fontSize: "14px"
                        }}>
                            {error}
                        </p>
                    )}

                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        );
    }

    export default LoginPage;