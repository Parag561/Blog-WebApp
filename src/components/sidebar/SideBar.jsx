import { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cats, setcats] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    let result = await fetch("http://localhost:5000/api/categories");
    result = await result.json();
    setcats(result);
    console.log(result);
  }
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT ME</span>
        <p>
          I have designed and developed a dynamic and feature-rich blogging web
          application that empowers users to engage with content creation,
          collaboration, and networking within a user-friendly environment. With
          a focus on user experience and data security, the application offers
          seamless registration, authentication, and content management
          functionalities.
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">Categories</span>
        <ul className="sidebarlist">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">Follow Us</span>
        <div className="sidebarsocial">
          <i className="sidebaricon fa-brands fa-linkedin"></i>
          <i className="sidebaricon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
