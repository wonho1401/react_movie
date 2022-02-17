import React, { useEffect, useState } from "react";
import Axios from "axios";

function Like(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [LikeNumber, setLikeNumber] = useState(0);
  const [Liked, setLiked] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
    };
    //서버에 like 정보를 요청해서 가져와야함.
    //방법이 여러가지 -> 1. fetch   2. axios
    Axios.post("/api/like/likeNumber", variables).then((response) => {
      if (response.data.success) {
        setLikeNumber(response.data.likeNumber);
      } else {
        alert("좋아요 수 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/like/liked", variables).then((response) => {
      if (response.data.success) {
        setLiked(response.data.liked);
      } else {
        alert("좋아요 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <button>
        {Liked ? "Unlike" : "Like"} {LikeNumber}
      </button>
    </div>
  );
}

export default Like;
