import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { role, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            background: "#1f1f1f",
            color: "white",
            borderRadius: "8px",
            marginBottom: "20px"
        }}>

            {/* LEFT SIDE */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                {/* Role Display (instead of clickable button) */}
                <span style={{
                    fontWeight: "bold",
                    background: "#333",
                    padding: "5px 10px",
                    borderRadius: "5px"
                }}>
                    {role} - {username}
                </span>

            </div>

            {/* RIGHT SIDE */}
            <button
                style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                onClick={() => {
                    logout();
                    navigate("/");
                }}
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;