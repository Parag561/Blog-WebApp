import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErr(true);
      return false;
    }

    let item = { name, email, password };
    try {
      let response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      response = await response.json();
      navigate("/login");
    } catch (err) {}
  };
  return (
    <div className="register">
      <span className="registerTitle">
        <b>Register</b>
      </span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>
          <strong>Username</strong>
        </label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter Your Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter Your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter Your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          register
        </button>
      </form>
      <button className="registerloginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {err && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
