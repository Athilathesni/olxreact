import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  

  const getUser = async () => {
    if (!token) {
      navigate("/login")
    } else {
      try {
        const res = await axios.get("http://localhost:4000/api/getuserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr);
          setUserData(res.data.data || null);
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login")
      }
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/getPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts()
  }, []);

  const handleClick = async (e) => {
    e.preventDefault()
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.delete("http://localhost:4000/api/deleteData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          alert(res.data.msg);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login");
      }
    }
  };
  return (
    <div className="body-profile">
    <div className="container">
      <div className="left-side">
        <form>
          <div className="form-group">
            <div className="image1">
              <img src={userData?.pic||""} alt="" />
            </div>
            <div className="d1"><span>Username:</span> {userDetails?.username}</div>
            <div className="d2"><span>Email:</span> {userDetails?.email}</div>
            <div className="d3"><span>Phone:</span> {userDetails?.phone}</div>
          </div>
        </form>
        {userData ? (
          <>
            <div>
              <div className="d4"> <span>District:</span> {userData.district}</div>
              <div className="d5"><span>Place:</span> {userData.place}</div>
              <div className="d6"><span>Pin: </span>{userData.pin}</div>
            </div>
            <Link to={"/edituser"}>
              <button className="edit-btn">Edit</button>
            </Link>
          </>
        ) : (
          <>
            <div>Note: Not added, need to create !</div>
            <Link to={"/adduser"}>
              <button className="create-btn">Add more</button>
            </Link>
          </>
        )}
        <button onClick={handleClick} className="delete-btn">Delete</button>
      </div>
      <div className="right-side">
        <Link to={"/sell"} className="sell-btn">
          <button className="sell1">Sell</button>
        </Link>
        {posts.length === 0 ? (
          <div className="po">No post added</div>
        ) : (
          <div className="right-post-card">
          {posts.map((post, index) => (
            <div key={index} className="show-post-card">
              <Link to={`/viewuserPost/${post._id}`} >
              <img
                src={post.images[0]}
                alt="First Post"
                className="post-image"
              />
              </Link>
              </div>
              ))}
              </div>
              )}
      </div>
    </div>
    </div>
  );
};

export default Profile;