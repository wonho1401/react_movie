import { Button } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import "./like.css";
import { IMAGE_BASE_URL } from "../../Config";

function LikePage() {
  const [Likes, setLikes] = useState([]);

  useEffect(() => {
    fetchLikeMovies();
  }, []);

  const fetchLikeMovies = () => {
    Axios.post("/api/like/getLikedMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/like/removeFromLike", variables).then((response) => {
      if (response.data.success) {
        fetchLikeMovies();
      } else {
        alert("리스트에서 지우는데에 실패했습니다.");
      }
    });
  };

  const renderCards = Likes.map((like, index) => {
    const content = (
      <div>
        {like.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${like.moviePost}`} />
        ) : (
          "No Image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${like.movieTitle}`}>
          <td>{like.movieTitle}</td>
        </Popover>
        <td>{like.movieRunTime} 분</td>
        <td>
          <Button onClick={() => onClickDelete(like.movieId, like.userFrom)}>
            Remove
          </Button>
        </td>
      </tr>
    );
  });

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
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default LikePage;
