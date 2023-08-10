import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./singlepost.css";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    getpost();
  });

  async function getpost() {
    let result = await fetch(`http://localhost:5000/api/posts/` + path);
    result = await result.json();
    setPost(result);
    setTitle(post.title);
    setDesc(post.desc);
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { name: user.name },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleupdate = async () => {
    await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
      name: user.name,
      title: title,
      desc: desc,
    });
    setUpdateMode(false);
  };

  return (
    <div className="singlePost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlepostimg" />
        )}
        {updateMode ? (
          <input
            type="text"
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
        ) : (
          <h1 className="singleposttitle">
            {title}
            {post.name === user?.name && (
              <div className="singlepostedit">
                <i
                  className="singleposticon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleposticon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:{" "}
            <Link to={`/?user=${post.name}`} className="link">
              <b>{post.name}</b>
            </Link>
          </span>
          <span className="singlepostdate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlepostdesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleupdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
