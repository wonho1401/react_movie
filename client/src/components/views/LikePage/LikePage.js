import { Button } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./like.css";

function LikePage() {
  const [Likes, setLikes] = useState([]);

  useEffect(() => {
    Axios.post("/api/like/getLikedMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2> Movies that you like</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove From Like</td>
          </tr>
        </thead>
        <tbody>
          {Likes.map((like, index) => (
            <tr key={index}>
              <td>{like.movieTitle}</td>
              <td>{like.movieRunTime} 분</td>
              <td>
                <Button>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LikePage;
