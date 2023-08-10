import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topleft">
        <i className="Topicon fa-brands fa-linkedin"></i>
        <i className="Topicon fa-brands fa-instagram"></i>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li className="toplistitems">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="toplistitems">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          <li className="toplistitems">
            <Link className="link" to="/">
              Contact
            </Link>
          </li>
          <li className="toplistitems">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="toplistitems" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link to="/settings">
            <img className="topimg" src={PF + user.profilepic} alt="" />
          </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistitems">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="toplistitems">
              {" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}

        <i className="Topsearchicon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
