import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewPost.css";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/getPost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 200) {
        setPost(res.data.post);
      } else {
        alert("Failed to fetch post data.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      navigate("/profile");
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);
  const eqbtn=()=>{
    localStorage.setItem('productId',post._id)
    localStorage.setItem('price',post.price)
    localStorage.setItem('sellerId',post.userId)
    navigate(`/eqpst`)
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="view">
      {/* <h2>Post Details</h2> */}
      <div className="postd">
        <div className="pimages">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="imagep"
            />
          ))}
        </div>
        <div className="info">
          <div className="lefti">
          <h3>title: {post.title}</h3> <br />
          <p>category: {post.category}</p> <br />
          <p>description: {post.description}</p> <br />
          <p>price: ₹ {post.price}</p>
          </div>
          <div className="righti">
          <p>
            <strong>Date:</strong> {post.date}
          </p>
          <br />
          <p>
            <strong>Time:</strong> {post.time}
          </p>
          </div>
          <button className="enq" onClick={eqbtn}>Enquire</button>
        </div>
      </div>
    </div>
  );
};

export default ViewPost