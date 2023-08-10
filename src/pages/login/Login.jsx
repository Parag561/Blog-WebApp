import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useContext, useRef } from "react";
import { Context } from "../../context/Context";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userRef.current.value || !passwordRef.current.value) {
      alert("please Enter Valid User");
      return false;
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          name: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">
        <b>Login</b>
      </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          <strong>User Name</strong>
        </label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your user name..."
          ref={userRef}
        />
        <label>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter Your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
